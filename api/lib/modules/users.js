var mongo = require('mongodb');

//this is a specific module to handle the user actions & updates
var changePassword = function(Model, user, options, callback){
    if(user.validPassword(options.password)) {
        user.password = user.generateHash(options.newPassword);
    }

    user.save(callback);
};

var submitNewRequest = function(Model, user, options, callback) {
    user.requests.push(options.newRequest);
    options.newRequest.operation = "request";
    user.history.push(options.newRequest);

    user.save(callback);
};

var addReward = function(Model, user, options, callback) {
    if(_hasEnoughPoints(user, options.newReward.points)) {
        user.rewards.push(options.newReward);
        options.newReward.operation = "reward";
        user.history.push(options.newReward);
        user.totalPoints -= options.newReward.points;
    }

    user.save(callback);
};


var updatePoints = function(Model, user, options, callback) {
    if(!isNaN(options.points)) {
        user.totalPoints = options.points;

        if(user.totalPoints < 0) {
            user.totalPoints = 0;
        }
    }

    user.save(callback);
};

var changeRole = function(Model, user, options, callback) {
    user.role = options.role;

    user.save(callback);
};

var changeRequestState = function(Model, user, options, callback) {
    var update = {
        'requests.$.state': options.request.state
    };

    if(options.request.state === 'Approved'){
        update.totalPoints = user.totalPoints + options.request.points;
    }

    Model.findOneAndUpdate({_id: mongo.ObjectID(user._id), 'requests.id': options.request.id}, {
        '$set': update
    }, callback );


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
