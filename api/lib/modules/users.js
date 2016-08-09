var mongo = require('mongodb');

//this is a specific module to handle the user actions & updates
var changePassword = function(Model, user, options, callback){
    if(user.validPassword(options.password)) {
        user.password = user.generateHash(options.newPassword);
    }

    user.save(callback);
};

var submitNewRequest = function(Model, user, options, callback) {
    user.requests.unshift(options.newRequest);
    options.newRequest.operation = "Request";
    user.history.unshift(options.newRequest);

    user.save(callback);
};

var addReward = function(Model, user, options, callback) {
    if(_hasEnoughPoints(user, options.newReward.points)) {
        user.rewards.unshift(options.newReward);
        options.newReward.operation = "Reward";
        user.history.unshift(options.newReward);
        user.totalPoints -= options.newReward.points;
    }

    user.save(callback);
};


var updatePoints = function(Model, user, options, callback) {
    if(!isNaN(options.points)) {
        user.totalPoints = options.points;

        if(user.totalPoints < 0 || user.totalPoints === '') {
            user.totalPoints = 0;
        }
    }

    user.history.unshift({
        operation: "Points",
        description: "Points balance updated to " + user.totalPoints + " by " + options.admin.username,
        date: new Date(),
        points: user.totalPoints,
        admin: options.admin
    });

    user.save(callback);
};

var changeRole = function(Model, user, options, callback) {
    var previousRole = user.role;

    user.role = options.role;
    user.history.unshift({
        operation: "Role",
        description: "Role changed from " + previousRole + " to " + user.role + " by " + options.admin.username,
        date: new Date(),
        admin: options.admin
    });

    user.save(callback);
};

var changeRequestState = function(Model, user, options, callback) {
    var update = {
            'requests.$.state': options.request.state
        },
        pushQuery = {
        },
        historyItem = {
            operation: 'Request State',
            date: new Date(),
            admin: options.admin,
            description: ''
        };


    if(options.request.state === 'Approved'){
        pushQuery[options.request.collection] = {
            $each: [options.request.subject],
            $position: 0
        };

        if(options.request.type === 'Goal'){
           update.totalPoints = parseInt(user.totalPoints) + parseInt(options.request.subject.points);
       }
        if (options.request.type === 'Reward') {
            update.totalPoints = parseInt(user.totalPoints) - parseInt(options.request.subject.points);
        }

        historyItem.description = "'" + options.request.subject.name + "' was approved by " + options.admin.username + " and the total points balance was updated from " +
          user.totalPoints + " to " + update.totalPoints + ". '" + options.request.subject.name + "' added to the user " + options.request.collection;
    }
    else {
        historyItem.description = "'" + options.request.subject.name + "' was rejected by " + options.admin.username;
    }

    pushQuery['history'] = {
        $each: [historyItem],
        $position: 0
    };

    Model.findOneAndUpdate({_id: mongo.ObjectID(user._id), 'requests.id': options.request.id}, {
        '$set': update,
        '$push': pushQuery

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
