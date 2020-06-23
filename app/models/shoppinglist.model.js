const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const ShoppinglistSchema = mongoose.Schema({
    "title": String,
    "author": String,
    "userId" : String,
    "household": String,
    "items": {}
}, {
    timestamps: true
});

module.exports = mongoose.model('Shoppinglist', ShoppinglistSchema);