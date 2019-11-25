const Shoppinglist = require('../models/shoppinglist.model');

// Create and Save a new Shoppinglist
exports.create = (req, res) => {
    // Validate request
    if(!req.body.items) {
        return res.status(400).send({
            message: "Shoppinglist items can not be empty"
        });
    }

    // Create a Shoppinglist
    const shoppinglist = new Shoppinglist({
        title: req.body.title,
        author: req.body.author,
        items: req.body.items
    });

    // Save Shoppinglist in the database
    shoppinglist.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Shoppinglist."
        });
    });
};

// Retrieve and return all shopping list items from the database.
exports.findAll = (req, res) => {
    Shoppinglist.find().sort({createdAt: -1})
        .then(shoppinglists => {
            res.send(shoppinglists);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving shopping lists."
        });
    });
};

// Find a single shoppinglist with a shoppinglistId
exports.findOne = (req, res) => {
    Shoppinglist.findById(req.params.shoppinglistId)
        .then(shoppinglist => {
            if(!shoppinglist) {
                return res.status(404).send({
                    message: "Shoppinglist not found with id " + req.params.shoppinglistId
                });
            }
            res.send(shoppinglist);
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

// Update a shoppinglist identified by the shoppinglistId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.items) {
        return res.status(400).send({
            message: "Shoppinglist content can not be empty"
        });
    }

    // Find Shoppinglist and update it with the request body
    Shoppinglist.findByIdAndUpdate(req.params.shoppinglistId, {
        title: req.body.title,
        author: req.body.author,
        items: req.body.items
    }, {new: true})
        .then(shoppinglist => {
            if(!shoppinglist) {
                return res.status(404).send({
                    message: "Shoppinglist not found with id " + req.params.shoppinglistId
                });
            }
            res.send(shoppinglist);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Shoppinglist not found with id " + req.params.shoppinglistId
            });
        }
        return res.status(500).send({
            message: "Error updating Shoppinglist with id " + req.params.shoppinglistId
        });
    });
};

// Delete a shoppinglist with the specified shoppinglistId in the request
exports.delete = (req, res) => {
    Shoppinglist.findByIdAndRemove(req.params.shoppinglistId)
        .then(shoppinglist => {
            if(!shoppinglist) {
                return res.status(404).send({
                    message: "Shoppinglist not found with id " + req.params.shoppinglistId
                });
            }
            res.send({message: "Shoppinglist deleted successfully!", deletedId: req.params.shoppinglistId});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Shoppinglist not found with id " + req.params.shoppinglistId
            });
        }
        return res.status(500).send({
            message: "Could not delete Shoppinglist with id " + req.params.shoppinglistId
        });
    });
};