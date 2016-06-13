//this is a specific module to handle the user actions & updates

var changePassword = function(User, id, newPassword, callback){
    //TODO: change user's password;
    User.findOne({'_id': id}, function(err, result) {
        if(err) {
            res.json(err);
        }
        else{
            result.password = newPassword;
            result.save(callback);
        }
    });
};

var submitNewRequest = function(request) {
    //TODO: submit a new goal request from a user
};

var addReward = function(reward) {
    //TODO: add a new Reward to the user
};

var updatePoints = function(points) {
    //TODO: update the user's points
};

module.exports = {
    changePassword: changePassword,
    submitNewRequest: submitNewRequest,
    addReward: addReward,
    updatePoints: updatePoints
};
