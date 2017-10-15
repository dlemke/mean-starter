var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = {
    retainKeyOrder: true
};

var UserSessionSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    sessionId: String,
    authenticated: Boolean,
    message: Object,
    signedIn: Date,
    signedOut: Date,
    ipAddress: String
}, options);

module.exports = mongoose.model('UserSession', UserSessionSchema);