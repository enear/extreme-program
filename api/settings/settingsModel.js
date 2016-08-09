var mongoose = require('mongoose');

var settingsSchema = mongoose.Schema({
    maxUserPoints: {type: Number, required: true},
    maxApprovePoints:  {type: Number, required: true}
});

module.exports = mongoose.model('Settings', settingsSchema);