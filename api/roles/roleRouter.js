var router = require('express').Router();
var Role = require('./roleModel');

router.get('/', function(req, res) {
    Role.find({}, function(err, result) {
        res.json(err || result);
    });
});

router.get('/:id', function(req, res) {
    Role.findOne({'_id': req.params.id}, function(err, result) {
        res.json(err || result);
    });
});

module.exports = router;
