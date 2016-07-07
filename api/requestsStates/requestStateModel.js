var mongoose = require('mongoose');

var stateSchema = mongoose.Schema({
    state: {type: String, required: true}
});

module.exports = mongoose.model("requestState", stateSchema);
