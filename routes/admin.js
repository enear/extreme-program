var router = require('express').Router();

router.get("/", function(req, res) {
    if(req.isAuthenticated()) {
        res.render('admin');
    }
    else {
        req.session.returnTo = '/admin';
        res.redirect('/login');
    }
});

module.exports = router;
