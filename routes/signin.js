var router = require('express').Router();

module.exports = function(passport, User) {
    router.get('/', function(req, res) {
        var user = {
            name: req.flash('name'),
            email: req.flash('email')
        };

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
                    req.flash('email', user.email);
                    req.flash('name', user.name);
                    res.render('signin', {user: user.email, name: user.name});
                }
            });
        }
    });

    router.post('/', function(req, res, next) {
        console.log(req.body);
        req.body.email = req.flash('email').toString();
        req.body.username = req.flash('name').toString();

        next();
    },
    passport.authenticate('signin', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    return router;
};
