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
    whenOccurred: Date,
    ipAddress: String
}, options);

module.exports = mongoose.model('UserSession', UserSessionSchema);