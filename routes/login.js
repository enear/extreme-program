var router = require('express').Router();

module.exports = function(passport) {
    router.get('/', function(req, res) {

        res.render('login', { message: req.flash('error') });
    });

    router.post('/', passport.authenticate('login', {
        successRedirect: '/login/redirectHandler',
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