var router = require('express').Router();
var State = require('./requestStateModel');
var lib = require('../lib/lib');

router.get('/', function(req, res) {
    State.find({}, function(err, result) {
        res.json(err || result);
    });
});

router.get('/:id', function(req, res) {
    State.findOne({'_id': req.params.id}, function(err, result) {
        res.json(err || result);
    });
});

module.exports = router;
