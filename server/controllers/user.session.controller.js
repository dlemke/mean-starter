
var mongoose = require('mongoose');
var UserSession = require('../models/user.session.model');

exports.logSession = function (req, res, session) {

    var userSession = new UserSession({
        userId: session.userId,
        userName: session.userName,
        sessionId: session.sessionId,
        authenticated: session.authenticated,
        message: session.message,
        whenOccurred: session.whenOccurred,
        ipAddress: session.ipAddress
    });

    userSession.save((err, session) => {
        if (err) {
            console.log('Error logging user session.');
        } else {
            console.log('User session has been logged.')
        }
    });
};

