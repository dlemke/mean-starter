const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user.model');

router.post('/register', (req, res, next) => {
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {

        if (err) {
            res.send({
                error: err.message,
                stack: err.stack
            });
        }

        passport.authenticate('local')(req, res, () => {

            req.session.save((err) => {

                if (err) {
                    res.send({
                        error: err.message,
                        stack: err.stack
                    });
                } else {
                    res.send({
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

router.post('/login', passport.authenticate('local', {}), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            res.send({
                error: err.message,
                stack: err.stack
            });
        } else {
            res.send({
                _id: req.user._id,                        
                userName: req.user.username,
                sessionId: req.sessionID,
                isAuthenticated: req.isAuthenticated()
            });
        }
    });
});

router.get('/status', (req, res) => {
    res.send({
        sessionId: req.sessionID,
        isAuthenticated: req.isAuthenticated()
    });
})

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            res.send({
                error: err.message,
                stack: err.stack
            });
        } else {
            res.send({
                success: true,
                isAuthenticated: req.isAuthenticated()
            });
        }
    });
});

module.exports = router;