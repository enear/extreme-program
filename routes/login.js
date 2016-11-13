var router = require('express').Router();

module.exports = function(passport) {
    router.get('/', function(req, res) {

        res.render('login', { message: req.flash('error') });
    });

    return router;
};