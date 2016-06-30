var router = require('express').Router();

router.get('/', function(req, res) {
    var user = req.flash('user');

    console.log(user);

    if(user.length === 0) {
        res.redirect('/');
    }
    else {
        req.flash('user', user);
        res.render('signin', {user: user});
    }
});

router.post('/', function(req, res) {
    console.log(req.flash('user'));
    console.log(req.body);

    //TODO: post request /api/users {username: email, email: email, password: password, role} and create a new user
});

module.exports = router;
