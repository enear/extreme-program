var router = require('express').Router();

router.get('/', function(req, res) {
    var user = req.flash('user');
    req.flash('user', user);

    if(user === '') {
        res.redirect('/');
    }
    else {
        res.render('signin', {user: user});
    }
});

router.post('/', function(req, res) {
    console.log(req.flash('user'));
    console.log(req.body);

    //TODO: post request /api/users {username: email, email: email, password: password, role} and create a new user
});

module.exports = router;
