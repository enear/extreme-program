var router = require('express').Router();
var Reward = require('./rewardModel');
var lib = require('../lib/lib');

router.get('/', function(req, res) {
    lib.models.getAllItems(Reward, function(err, result) {
        res.json(err || result);
    });
});

router.post('/', function(req, res) {
    var newReward = new Reward({
        name: req.body.name,
        points: req.body.points,
        description: req.body.description
    });

    newReward.save(function(err, result) {
        res.json(err || result);
    });
});

router.get('/:id', function(req, res) {
    lib.models.getById(Reward, req.params.id, function(err, result) {
        res.json(err || result);
    });
});

module.exports = router;
