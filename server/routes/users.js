const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user.model');

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
      return res.status(401).send({
        success: false,
        message: 'Authentication failed',
        info: info,
        isAuthenticated: req.isAuthenticated()
      });
    }

    req.login(user, function (err) {

      if (err) {
        return next(err);
      }

      return res.send({
        _id: req.user._id,
        userName: req.user.username,
        sessionId: req.sessionID,
        isAuthenticated: req.isAuthenticated()
      });

    });

  })(req, res, next);
});

router.get('/status', (req, res) => {
  return res.send({
    sessionId: req.sessionID,
    isAuthenticated: req.isAuthenticated()
  });
})

router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.save((err) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.send({
        success: true,
        isAuthenticated: req.isAuthenticated()
      });
    }
  });
});

module.exports = router;
