var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var options = {
    retainKeyOrder: true
};

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
}, options);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', UserSchema);