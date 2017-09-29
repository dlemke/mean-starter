const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user.model');
const UserSession = require('../models/user.session.model');
const userSessionCtrl = require('../controllers/user.session.controller');

router.post('/register', (req, res, next) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, user) => {

    if (err) {
      return res.status(400).send(err);
    }

    passport.authenticate('local')(req, res, () => {
      req.session.save((err) => {

        if (err) {
          return res.status(400).send(err);
        } else {
          return res.send({
            _id: req.user._id,
            userName: req.user.username,
            sessionId: req.sessionID,
            isAuthenticated: req.isAuthenticated()
          });
        }

      });
    });

  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    if (err) {
      return next(err);
    }

    if (!user) {

      var session = createSession(req, res, info, false);
      userSessionCtrl.logSession(req, res, session);

      return res.status(401).send({
        success: false,
        message: 'Authentication failed',
        info: session.message,
        isAuthenticated: session.authenticated
      });
    }

    req.login(user, function (err) {

      if (err) {
        return next(err);
      }

      var session = createSession(req, res, info, true);
      userSessionCtrl.logSession(req, res, session);

      return res.send({
        _id: session.userId,
        userName: session.userName,
        sessionId: session.sessionId,
        isAuthenticated: session.authenticated
      });

    });

  })(req, res, next);
});

router.put('/update/:id', (req, res, next) => {

  var query = User.findByIdAndUpdate(req.params.id, {
    username: req.body.username
  }, {
      new: true
    });

  query.exec(function (err, result) {
    if (err) {
      return next(err);
    } else {
      return res.json(result);
    }
  });

});

router.get('/status', (req, res) => {
  return res.send({
    _id: req.user._id,
    userName: req.user.username,
    sessionId: req.sessionID,
    isAuthenticated: req.isAuthenticated()
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  req.logout();

  return res.send({
    success: true,
    isAuthenticated: req.isAuthenticated()
  });
});

createSession = function (req, res, info, isValid) {
  var session = new UserSession({
    userId: isValid ? req.user._id : null,
    userName: isValid ? req.user.username : req.body.username,
    sessionId: isValid ? req.sessionID : null,
    authenticated: req.isAuthenticated(),
    message: isValid ? { message: 'Successful user login.' } : info,
    whenOccurred: Date.now(),
    ipAddress: getClientIP(req)
  });

  return session;
}

getClientIP = function (req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

module.exports = router;
