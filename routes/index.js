var router = require('express').Router();

router.get("/", function(req, res) {
    if(req.isAuthenticated()) {
        res.render('index');
    }
    else {
        res.redirect('/login');
    }
});


module.exports = router;
