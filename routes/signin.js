var router = require('express').Router();

module.exports = function(passport, User) {
    router.get('/', function(req, res) {
        var user = req.session.info.user;

        if(user.email.length === 0) {
            res.redirect('/#login');
        }
        else {
            User.findOne({'email': user.email}, function(err, result) {
                if(err){
                    throw  err;
                }

                if(result){
                    res.redirect('/login');
                }
                else{

                    res.render('signin', {user: user.email, name: user.name});
                }
            });
        }
    });

    router.post('/', function(req, res, next) {
        req.body.email = req.session.info.user.email;
        req.body.username = req.session.info.user.name;

        req.session.info = null;

        next();
    },
    passport.authenticate('signin', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    return router;
};
