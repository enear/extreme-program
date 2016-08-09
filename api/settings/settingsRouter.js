var router = require('express').Router();
var Settings = require('./settingsModel');

router.get('/', function(req, res) {
  Settings.findOne({}, function(err, result) {
      res.json(err || result);
  });
});

module.exports = router;