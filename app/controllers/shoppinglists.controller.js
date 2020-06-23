const Shoppinglist = require('../models/shoppinglist.model');

exports.create = (req, res) => {

    if(!req.body.items) {
        return res.status(400).send({
            message: "ShoppingList items can not be empty..."
        });
    }

    if(!req.body.userId) {
        return res.status(400).send({
            message: "A ShoppingList to belong to a user..."
        });
    }

    const shoppingList = new Shoppinglist({
        title: req.body.title,
        author: req.body.author,
        userId: req.body.userId,
        household: req.body.household,
        items: req.body.items,
        completed: 0
    });

    shoppingList.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the ShoppingList."
        });
    });
};

exports.findAll = (req, res) => {
    Shoppinglist.find({ household : req.params.household }).sort({createdAt: -1})
        .then(shoppingLists => {
            res.send(shoppingLists);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving shopping lists."
        });
    });
};

exports.findOne = (req, res) => {
    Shoppinglist.find({ _id : req.params.shoppinglistId, household: req.params.household })
        .then(shoppingList => {
            if(!shoppingList) {
                return res.status(404).send({
                    message: "Shoppinglist not found with id " + req.params.shoppinglistId
                });
            }
            res.send(shoppingList);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ShoppinglistId not found with id " + req.params.shoppinglistId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Shoppinglist with id " + req.params.shoppinglistId
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.items) {
        return res.status(400).send({
            message: "ShoppingList content can not be empty"
        });
    }

    Shoppinglist.findByIdAndUpdate(req.params.shoppinglistId, {
        title: req.body.title,
        author: req.body.author,
        userId: req.body.userId,
        household: req.body.household,
        items: req.body.items,
        completed: req.body.completed || 0
    }, {new: true})
        .then(shoppinglist => {
            if(!shoppinglist) {
                return res.status(404).send({
                    message: "ShoppingList not found with id " + req.params.shoppinglistId
                });
            }
            res.send(shoppinglist);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ShoppingList not found with id " + req.params.shoppinglistId
            });
        }
        return res.status(500).send({
            message: "Error updating ShoppingList with id " + req.params.shoppinglistId
        });
    });
};

exports.delete = (req, res) => {
    Shoppinglist.findByIdAndRemove(req.params.shoppinglistId)
        .then(shoppingList => {
            if(!shoppingList) {
                return res.status(404).send({
                    message: "ShoppingList not found with id " + req.params.shoppinglistId
                });
            }
            res.send({message: "ShoppingList deleted successfully!", deletedId: req.params.shoppinglistId});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "ShoppingList not found with id " + req.params.shoppinglistId
            });
        }
        return res.status(500).send({
            message: "Could not delete ShoppingList with id " + req.params.shoppinglistId
        });
    });
};