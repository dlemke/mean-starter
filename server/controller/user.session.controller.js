
var mongoose = require('mongoose');
var UserSession = require('../models/user.session.model');

exports.logSession = function (req, res, session) {

    var userSession = new UserSession({
        userId: req.user._id,
        userName: req.user.username,
        sessionId: req.sessionId,
        authenticated: session.success,
        message: session.message,
        token: session.token,
        whenOccurred: session.whenOccurred,
        whenExpire: session.whenExpire,
        ipAddress: req.connection.remoteAddress
    });

    userSession.save((err) => {

        if (err) {
            res.status(401).send({
                error: err,
                stack: err.stack
            });
        } else {
            res.status(200).send({
                message: 'session saved'
            });
        }
    });
};

