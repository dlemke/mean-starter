
var mongoose = require('mongoose');
var UserSession = require('../models/user.session.model');

exports.logSession = function (req, res, session) {

    var userSession = new UserSession(session);
    userSession.save((err) => {
        if (err) {
            console.log('Error logging user session.');
        } else {
            console.log('User session has been logged.')
        }
    });

};

