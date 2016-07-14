var router = require('express').Router();

router.get("/", function(req, res) {
    if(req.isAuthenticated()) {
        if(req.user.role === 'Standard') {
            req.logout();
            req.session.returnTo = '';
            res.redirect('/login');
        }
        else {
            res.render('admin');
        }
    }
    else {
        req.session.returnTo = '/admin';
        res.redirect('/login');
    }
});

module.exports = router;
