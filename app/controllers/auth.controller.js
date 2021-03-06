let User = require('../models/user.model');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

exports.create = (req, res) => {

    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
            name : req.body.name,
            email : req.body.email,
            household : req.body.household,
            password : hashedPassword,
            role : "household"
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            let token = jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 7 * 24 * 60 * 60 // expires in 1 week
            });
            res.status(200).send({ auth: true, token: token });
        });
};

exports.getMe = (req, res) => {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id,
            { password: 0 }, // projection
            function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");

                res.status(200).send(user);
            });
    });
};

exports.getAll = (req, res) => {

    checkUserIsAdmin(req, res);

    User.find().sort({createdAt: -1})
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the users."
        });
    });

};

exports.delete = (req, res) => {

    checkUserIsAdmin(req, res);

    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({message: "User deleted successfully!", deletedId: req.params.userId});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.userId
        });
    });
};

exports.login = (req, res) => {

    User.findOne({ household: req.body.household, email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        let token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 7 * 24 * 60 * 60 // expires in 1 week
        });

        res.status(200).send({ auth: true, token: token, userId: user._id });
    });

};

exports.logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
};

function checkUserIsAdmin(req, res) {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        User.findById(decoded.id,
            {password: 0}, // projection
            function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");
                if (user.role !== 'admin') return res.status(404).send("Not allowed...");
            });
    });

};