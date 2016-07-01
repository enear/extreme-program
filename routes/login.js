module.exports = function(App, passport) {
    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
