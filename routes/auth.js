var router = require('express').Router();
var request = require('request');

module.exports = function(passport) {
    router.get('/slack', passport.authenticate('slack-login'));

    router.get('/slack/return', passport.authenticate('slack-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    return router;
};