var router = require('express').Router();
var User = require('./userModel');
var lib = require('../lib/lib');

router.get('/', function(req, res) {
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


router.get('/:id', function(req, res) {
    User.findOne({'_id': req.params.id}, function(err, result) {
        res.json(err || result);
    });
});

router.post('/:id', function(req, res){
    User.findOne({'_id': req.params.id}, function(err, result) {
        lib.users[req.body.action](User, result, req.body, function(err, result) {
            console.log(result);
            res.json(err || result);
        });
    });
});

router.delete('/:id', function(req, res) {
    User.findOneAndRemove({'_id': req.params.id}, function(err, result) {
        res.json(err || result);
    });
});

module.exports = router;
