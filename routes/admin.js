var router = require('express').Router();

router.get("/", function(req, res) {
    if (req.isAuthenticated()) {
        if (req.user.role === 'Standard') {
            req.logout();

            req.flash('error', "You don't have permission to access this page");

            console.log(req.flash);

            req.session.previousUrl = '';

            res.redirect('/');
        } else {
            res.render('admin');
        }
    } else {
        req.session.previousUrl = '/admin';

        res.redirect('/login-admin');
    }
});


module.exports = router;