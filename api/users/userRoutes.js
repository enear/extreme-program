var router = require('express').Router();
var User = require('./userModel');
var lib = require('../lib/lib');
var permission = lib.auth.permission(User);

router.get('/', permission.admin, function(req, res) {
    User.find({}, function(err, result) {
        res.json(err || result);
    });
});

router.post('/', function(req, res, next) {
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        role: req.body.role
    });

    newUser.password = newUser.generateHash(req.body.password);

    newUser.save(function(err, result) {
        res.json(err || result);
    });
});


router.get('/:id', permission.user, function(req, res) {
    User.findOne({'_id': req.params.id}, function(err, result) {
        res.json(err || result);
    });
});

router.post('/:id', permission.user, function(req, res){
    User.findOne({'_id': req.params.id}, function(err, result) {
        var passwordState = '';

        if(req.body.action === 'changePassword') {
            if(!result.validPassword(req.body.password)) {
                passwordState = "Wrong Password!";
            }
        }

        lib.users[req.body.action](User, result, req.body, function(err, user) {

            if(req.body.action === 'changePassword') {
                if(user.validPassword(req.body.newPassword) && passwordState === '') {
                    passwordState = "Password changed with success!";
                }
                else {
                    passwordState = "Wrong Password!";
                }
            }

            res.json(err || {user: user, passwordState: passwordState} );
        });
    });
});

router.delete('/:id', permission.admin, function(req, res) {
    User.findOneAndRemove({'_id': req.params.id}, function(err, result) {
        res.json(err || result);
        });
});

module.exports = router;
