var mongoose = require('mongoose');

var roleSchema = mongoose.Schema({
    role: {type: String, required: true}
});

module.exports = mongoose.model("Role", roleSchema);
