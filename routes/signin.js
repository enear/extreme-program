module.exports = function(app, passport, User) {
    app.get('/signin', function(req, res) {
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
                    req.flash('user', user);
                    res.render('signin', {user: user});
                }
            });
        }
    });

    app.post('/signin', function(req, res, next) {

        req.body.email = req.flash('user').toString();

        next();
    },
    passport.authenticate('signin', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
};
