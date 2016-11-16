var router = require('express').Router();

module.exports = function(passport) {
    router.get('/', function(req, res) {

        console.log(req.flash);

        res.render('login', { message: req.flash('error') });
    });

    return router;
};