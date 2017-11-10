
exports.logSession = function (req, res, session) {

    var userSession = new req.models.UserSession(session);
    userSession.save((err) => {
        if (err) {
            console.log('Error logging user session.');
        } else {
            console.log('User session has been logged.')
        }
    });

};

exports.createSession = function (req, res, info, isValid) {
    var session = new req.models.UserSession({
        userId: isValid ? req.user._id : null,
        userName: isValid ? req.user.username : req.body.username,
        sessionId: isValid ? req.sessionID : null,
        authenticated: req.isAuthenticated(),
        message: isValid ? { name: 'SuccessfulLogin', message: 'User was successfully authenticated.' } : info,
        signedIn: Date.now(),
        signedOut: null,
        ipAddress: getClientIp(req)
    });

    return session;
};

exports.logoutSession = function (req, res) {
    req.models.UserSession.findOneAndUpdate({ sessionId: req.sessionID }, { signedOut: Date.now() }, (err) => {
        if (err) console.log(err);
    });
};

function getClientIp(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
};

