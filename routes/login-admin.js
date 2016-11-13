var router = require('express').Router();

module.exports = function(passport, User) {
    router.get('/', function(req, res) {

        res.render('login-admin', { message: req.flash('error') });
    });

    router.post('/', passport.authenticate('login', {
        successRedirect: '/admin',
        failureRedirect: '/login-admin',
        failureFlash: true
    }));

    return router;
};
