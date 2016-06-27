var router = require('express').Router();
var Goal = require('./goalModel');
var lib = require('../lib/lib');

router.get('/', function(req, res) {
    Goal.find({}, function(err, result) {
        res.json(err || result);
    });
});

router.post('/', function(req, res) {
    var newGoal = new Goal(req.body);

    newGoal.save(function(err, result) {
        res.json(err || result);
    });
});

router.get('/:id', function(req, res) {
    Goal.findOne({'_id': req.params.id}, function(err, result) {
        res.json(err || result);
    });
});

router.post('/:id', function(req, res) {
    Goal.findOne({'_id': req.params.id}, function(err, result) {
        for(var key in req.body) {
            if(result[key] !== req.body[key]) {
                result[key] = req.body[key];
            }
        }

        result.save(function(err, result) {
            res.json(err || result);
        });
    });
});

router.delete('/:id', function(req, res) {
    Goal.findOneAndRemove({'_id': req.params.id}, function(err, result) {
        res.json(err || result);
    });
});

module.exports = router;
