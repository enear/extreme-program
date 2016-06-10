var mongoose = require('mongoose');

var roleSchema = mongoose.Schema({
    role: String
});

module.exports = mongoose.model("Role", roleSchema);
