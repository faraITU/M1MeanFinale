const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    lastname: String,
    firstname: String,
    email: {type: String, unique: true},
    password: String,
});

module.exports = mongoose.model('user', userSchema,'users');