var router = require('express').Router();

module.exports = function(passport, User) {
    router.get('/', function(req, res) {

        res.render('login-admin', { message: req.flash('error') });
    });

    router.post('/', passport.authenticate('directory-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    return router;
};
