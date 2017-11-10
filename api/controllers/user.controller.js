const passport = require('passport');
const userSessionCtrl = require('../controllers/user.session.controller');

exports.register = function (req, res, next) {

    var newUser = new req.models.User({ username: req.body.username });
    req.models.User.register(newUser, req.body.password, (err, user) => {

        if (err) return res.status(400).send(err);

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {

                if (err) return res.status(400).send(err);

                return res.send({
                    _id: req.user._id,
                    userName: req.user.username,
                    sessionId: req.sessionID,
                    isAuthenticated: req.isAuthenticated()
                });

            });
        });

    });
};

exports.login = function (req, res, next) {

    passport.authenticate('local', (err, user, info) => {

        if (err) return res.status(400).send(err);

        if (!user) {
            var session = userSessionCtrl.createSession(req, res, info, false);
            userSessionCtrl.logSession(req, res, session);

            return res.status(401).send({
                success: false,
                message: 'Authentication failed',
                info: session.message,
                isAuthenticated: session.authenticated
            });
        }

        req.login(user, function (err) {

            if (err) return res.status(400).send(err);

            var session = userSessionCtrl.createSession(req, res, info, true);
            userSessionCtrl.logSession(req, res, session);

            return res.send({
                _id: session.userId,
                userName: session.userName,
                sessionId: session.sessionId,
                isAuthenticated: session.authenticated
            });

        });

    })(req, res, next);
};

exports.update = function (req, res, next) {
    var query = req.models.User.findByIdAndUpdate(req.params.id, { username: req.body.username }, { new: false });
    query.exec(function (err, result) {
        if (err) return res.status(400).send(err);
        return res.json(result);
    });
};

exports.getStatus = function (req, res) {
    if (req.user) {
        return res.send({
            _id: req.user._id,
            userName: req.user.username,
            sessionId: req.sessionID,
            isAuthenticated: req.isAuthenticated()
        });
    }
};

exports.logout = function (req, res) {
    userSessionCtrl.logoutSession(req, res);
    req.session.destroy();
    req.logout();

    return res.send({
        success: true,
        isAuthenticated: req.isAuthenticated()
    });
};
