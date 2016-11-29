var router = require('express').Router();
var request = require('request');

module.exports = function(passport) {
    router.get('/slack', passport.authenticate('slack-login'));

    router.get('/slack/return', passport.authenticate('slack-login', {
        successRedirect: '/auth/redirectHandler',
        failureRedirect: '/login',
        failureFlash: true
    }));

    router.get('/redirectHandler', function(req, res) {
        var redirectTo = req.session.previousUrl !== '' ? req.session.previousUrl : '/';

        req.session.previousUrl = '';

        res.redirect(redirectTo);
    });

    return router;
};