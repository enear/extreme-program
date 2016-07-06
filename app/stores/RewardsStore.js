var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants/constants');
var _ = require('underscore');


var _rewards = [],
    _reward = {},
    _user = {};

var RewardStore = _.extend({}, EventEmitter.prototype, {
    getRewards: function() {
        return _rewards;
    },
    getRewardById: function(id) {
        _rewards.forEach(function(reward) {
            if(reward._id === id) {
                _reward = reward;
            }
        });

        return _reward;
    },
    getReward: function() {
        return _reward;
    },
    getUser: function() {
        return _user;
    },
    addChangeListener: function(callback){
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case constants.GET_REWARDS:
            _rewards = action.data;
            RewardStore.emit('change');
            break;
        case constants.GET_REWARD:
            _reward = action.data;
            RewardStore.emit('change');
            break;
        case constants.GET_USER:
            _user = action.user;
            RewardStore.emit('change');
            break;
        case constants.SEND_REWARD:
            _user = action.data;
            RewardStore.emit('change');
            break;
        default:
            return true;
    }
});

module.exports = RewardStore;
