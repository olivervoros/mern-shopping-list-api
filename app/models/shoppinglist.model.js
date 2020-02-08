const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const ShoppinglistSchema = mongoose.Schema({
    "title": String,
    "author": String,
    "userId" : String,
    "items": {}
}, {
    timestamps: true
});

module.exports = mongoose.model('Shoppinglist', ShoppinglistSchema);

/*
{"id": 1, "title": "Oliver's Shopping list 2019 08 10.", "author": "Oliver", "date": "10 03 1980", "items" : {"milk": 1, "eggs": 2, "water": 3, "apples": 4}},
{"id": 2, "title": "Aldi Shopping list 2019 06 22.", "author": "Oliver", "date": "11 12 1950", "items" : {"milk": 5, "eggs": 6, "water": 7, "apples": 8}},
{"id": 3, "title": "Gardening Shopping list.", "author": "Oliver", "date": "07 10 1979", "items" : {"milk": 9, "eggs": 10, "water": 11, "apples": 12}},
{"id": 4, "title": "Just added a new list item.", "author": "Oliver", "date": "11 15 2016", "items" : {"milk": 13, "eggs": 14, "water": 15, "apples": 16}},
{"id": 5, "title": "Another shopping list.", "author": "Bryda", "date": "06 04 1956", "items" : {"milk": 93, "eggs": 94, "water": 95, "apples": 96}}
 */