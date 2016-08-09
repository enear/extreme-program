var Settings = require('./settingsModel');

Settings.find({}, function(err, result) {
  if(err) {
    throw err
  }

  if(result.length === 0) {
    Settings.collection.insert([
      {
        maxUserPoints: 1000,
        maxApprovePoints: 10000
      }
    ]);
  }
});
