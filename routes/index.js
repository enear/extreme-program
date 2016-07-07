var router = require('express').Router();

router.get("/", function(req, res) {

    if(req.isAuthenticated()) {
        if(req.query.getuser === "true") {
            res.json(req.user);
        }
        else{
            res.render('index');
        }
    }
    else {
        req.session.returnTo = '/';
        res.redirect('/login');
    }
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
