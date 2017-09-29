var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSessionSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    sessionId: String,
    authenticated: Boolean,
    message: String,
    token: String,
    whenOccurred: Date,
    whenExpire: Date,
    ipAddress: String
});

module.exports = mongoose.model('UserSession', UserSessionSchema);