var mongoose = require('mongoose');

var rewardSchema = new mongoose.Schema({
    name: {type: String, required: true},
    points: {type: Number, required: true},
    createdBy: {type: String, required: true},
    created: {type: Date, default: Date.now, required: true},
    image: String,
    summary: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model("Reward", rewardSchema);
