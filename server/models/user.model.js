var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var options = {
    retainKeyOrder: true
};

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
}, options);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', UserSchema);