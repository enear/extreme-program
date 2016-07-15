var router = require('express').Router();

module.exports = function(passport, User) {
    router.get('/', function(req, res) {
        var user = req.flash('user');

        if(user.length === 0) {
            res.redirect('/#login');
        }
        else {
            User.findOne({'email': user}, function(err, result) {
                if(err){
                    throw  err;
                }

                if(result){
                    res.redirect('/login');
                }
                else{
                    res.render('signin', {user: user});
                }
            });
        }
    });

    router.post('/', function(req, res, next) {

        req.body.email = req.flash('user').toString();

        next();
    },
    passport.authenticate('signin', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    return router;
};
