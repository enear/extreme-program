var router = require('express').Router();
var Goal = require('./goalModel');
var lib = require('../lib/lib');

router.get('/', function(req, res) {
    lib.models.getAllItems(Goal, function(err, result) {
        res.json(err || result);
    });
});

router.post('/', function(req, res) {
    var newGoal = new Goal({
        name: req.body.name,
        points: req.body.points,
        description: req.body.description
    });

    newGoal.save(function(err, result) {
        res.json(err || result);
    });
});

router.get('/:id', function(req, res) {
    lib.models.getById(Goal, req.params.id, function(err, result) {
        res.json(err || result);
    });
});

module.exports = router;
