var router = require('express').Router();

router.get("/", function(req, res) {

    if(req.isAuthenticated()) {
        if(req.query.getuser === "true") {
            res.json(req.user);
        }
        else{
            console.log("reached here!");
            res.render('index');
        }
    }
    else {
        res.redirect('/login');
    }
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
