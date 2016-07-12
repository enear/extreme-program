//this is a specific module to handle the user actions & updates
var changePassword = function(user, options, callback){
    if(user.validPassword(options.password)) {
        user.password = user.generateHash(options.newPassword);
    }

    user.save(callback);
};

var submitNewRequest = function(user, options, callback) {
    user.requests.push(options.newRequest);
    options.newRequest.operation = "request";
    user.history.push(options.newRequest);

    user.save(callback);
};

var addReward = function(user, options, callback) {
    if(_hasEnoughPoints(user, options.newReward.points)) {
        user.rewards.push(options.newReward);
        options.newReward.operation = "reward";
        user.history.push(options.newReward);
        user.totalPoints -= options.newReward.points;
    }

    user.save(callback);
};


var updatePoints = function(user, options, callback) {
    if(!isNaN(options.points)) {
        user.totalPoints = options.points;

        if(user.totalPoints < 0) {
            user.totalPoints = 0;
        }
    }

    user.save(callback);
};

var changeRole = function(user, options, callback) {
    user.role = options.role;

    user.save(callback);
};

var changeRequestState = function(user, options, callback) {
    //TODO: this is not saving the user as it should save
    
    // console.log(user);
    // for(var i = 0, l = user.requests.length; i < l; i+=1) {
    //     if(user.requests[i].id === options.request.id){
    //         user.requests[i] = options.request;
    //         if(user.requests[i].state === 'Approved') {
    //             user.totalPoints += options.request.points;
    //         }
    //
    //         break;
    //     }
    // }
    //
    // user.save(callback);

};

var _hasEnoughPoints = function(user, points) {
    return user.totalPoints >= points;
};


module.exports = {
    changePassword: changePassword,
    submitNewRequest: submitNewRequest,
    addReward: addReward,
    updatePoints: updatePoints,
    changeRole: changeRole,
    changeRequestState: changeRequestState
};
