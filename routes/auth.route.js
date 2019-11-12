module.exports = (app) => {

    const auth = require('../app/controllers/auth.controller');
    const VerifyToken = require('../app/auth/VerifyToken');

    app.post('/api/register', auth.create);

    app.get('/api/me', VerifyToken, auth.getMe);

    app.delete('/api/me/:userId', VerifyToken, auth.delete);

    app.post('/api/login', auth.login);

    app.get('/api/logout', auth.logout);

}