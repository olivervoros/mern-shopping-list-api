module.exports = (app) => {

    const shoppinglists = require('../app/controllers/shoppinglists.controller');
    const VerifyToken = require('../app/auth/VerifyToken');

    // Create a new Shopping List
    app.post('/shoppinglists', VerifyToken, shoppinglists.create);

    // Retrieve all Shopping Lists
    app.get('/shoppinglists', VerifyToken, shoppinglists.findAll);

    // Retrieve a single Shopping List with shoppinglistId
    app.get('/shoppinglists/:shoppinglistId', VerifyToken, shoppinglists.findOne);

    // Update a Shopping List with shoppinglistId
    app.put('/shoppinglists/:shoppinglistId', VerifyToken, shoppinglists.update);

    // Delete a Shopping List with shoppinglistId
    app.delete('/shoppinglists/:shoppinglistId', VerifyToken, shoppinglists.delete);

}

