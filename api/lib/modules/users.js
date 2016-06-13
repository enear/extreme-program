//this is a specific module to handle the user actions & updates

var changePassword = function(user, options, callback){
    user.password = options.newPassword;
    user.save(callback);
};

var submitNewRequest = function(user, options, callback) {
    //TODO: submit a new goal request from a user
};

var addReward = function(user, options, callback) {
    //TODO: add a new Reward to the user
};

var updatePoints = function(user, options, callback) {
    user.totalPoints += options.points;
    user.save(callback);
};

module.exports = {
    changePassword: changePassword,
    submitNewRequest: submitNewRequest,
    addReward: addReward,
    updatePoints: updatePoints
};
