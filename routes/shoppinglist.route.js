module.exports = (app) => {

    const shoppinglists = require('../app/controllers/shoppinglists.controller');
    const VerifyToken = require('../app/auth/VerifyToken');

    // Create a new Shopping List
    app.post('/api/shoppinglists', VerifyToken, shoppinglists.create);

    // Retrieve all Shopping Lists
    app.get('/api/shoppinglists', VerifyToken, shoppinglists.findAll);

    // Retrieve a single Shopping List with shoppinglistId
    app.get('/api/shoppinglists/:shoppinglistId', VerifyToken, shoppinglists.findOne);

    // Update a Shopping List with shoppinglistId
    app.put('/api/shoppinglists/:shoppinglistId', VerifyToken, shoppinglists.update);

    // Delete a Shopping List with shoppinglistId
    app.delete('/api/shoppinglists/:shoppinglistId', VerifyToken, shoppinglists.delete);

}

