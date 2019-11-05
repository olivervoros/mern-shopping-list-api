module.exports = (app) => {

    const shoppinglists = require('../app/controllers/shoppinglists.controller.js');

    // Create a new Note
    app.post('/shoppinglists', shoppinglists.create);

    // Retrieve all Notes
    app.get('/shoppinglists', shoppinglists.findAll);

    // Retrieve a single Note with noteId
    app.get('/shoppinglists/:shoppinglistId', shoppinglists.findOne);

    // Update a Note with noteId
    app.put('/shoppinglists/:shoppinglistId', shoppinglists.update);

    // Delete a Note with noteId
    app.delete('/shoppinglists/:shoppinglistId', shoppinglists.delete);

}

