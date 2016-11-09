var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    created: { type: Date, default: Date.now },
    requests: { type: Array, default: [] },
    totalPoints: { type: Number, default: 0, required: true },
    history: { type: Array, default: [] },
    rewards: { type: Array, default: [] },
    goals: { type: Array, default: [] },
    slackAccessToken: String
});

userSchema.methods = {
    generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    }
};

module.exports = mongoose.model('User', userSchema);