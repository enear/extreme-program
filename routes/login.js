var router = require('express').Router();

module.exports = function(passport) {
    router.get('/', function(req, res) {
        res.render('login', { message: req.flash('error') });
    });

    router.post('/',  passport.authenticate('WindowsAuthentication', {
        successRedirect: '/auth/redirectHandler',
        failureRedirect: '/login',
        failureFlash: true
    }));

    return router;
};