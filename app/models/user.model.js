
let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    household: String,
    password: String,
    role: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');