var router = require('express').Router();
var Reward = require('./rewardModel');

router.get('/', function(req, res) {
    Reward.find({}, function(err, result) {
        res.json(err || result);
    });
});

router.post('/', function(req, res) {
    var newReward = new Reward(req.body);

    newReward.createdBy = req.user.email;

    newReward.save(function(err, result) {
        res.json(err || result);
    });
});

router.get('/:id', function(req, res) {
    Reward.findOne({'_id': req.params.id}, function(err, result) {
        res.json(err || result);
    });
});

router.post('/:id', function(req, res) {
    Reward.findOne({'_id': req.params.id}, function(err, result) {
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
    Reward.findOneAndRemove({'_id': req.params.id}, function(err, result) {
        res.json(err || result);
    });
});

module.exports = router;
