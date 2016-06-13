var mongoose = require('mongoose');

var goalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    points: {type: Number, required: true},
    createdBy: String,
    created: {type: Date, default: Date.now},
    image: String,
    description: {type: String, required: true}
});

module.exports = mongoose.model('Goal', goalSchema);
