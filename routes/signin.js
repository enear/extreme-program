var router = require('express').Router();

router.get('/', function(req, res) {
    var user = req.flash('user');
    if(user === '') {
        res.redirect('/');
    }
    else {
        res.render('signin', {user: user});
    }
});

router.post('/', function(req, res) {
    console.log(req.body);
});

module.exports = router;
