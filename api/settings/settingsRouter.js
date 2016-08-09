var router = require('express').Router();
var Settings = require('./settingsModel');

router.get('/', function(req, res) {
  Settings.findOne({}, function(err, result) {
      res.json(err || result);
  });
});

router.post('/', function(req, res) {
    Settings.findOne({}, function(err, result) {
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

module.exports = router;