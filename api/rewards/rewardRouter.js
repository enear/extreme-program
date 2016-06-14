var router = require('express').Router();
var Reward = require('./rewardModel');
var lib = require('../lib/lib');

router.get('/', function(req, res) {
    lib.models.getAllItems(Reward, function(err, result) {
        res.json(err || result);
    });
});

router.post('/', function(req, res) {
    var newReward = new Reward(req.body);

    newReward.save(function(err, result) {
        res.json(err || result);
    });
});

router.get('/:id', function(req, res) {
    lib.models.getById(Reward, req.params.id, function(err, result) {
        res.json(err || result);
    });
});

router.post('/:id', function(req, res) {
    lib.models.updateItem(Reward, req.params.id, req.body, function(err, result) {
        res.json(err || result);
    });
});

router.delete('/:id', function(req, res) {
    lib.models.deleteItem(Reward, req.params.id, function(err, result) {
        res.json(err || result);
    });
});

module.exports = router;
