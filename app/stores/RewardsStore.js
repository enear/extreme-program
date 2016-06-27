var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var RewardsConstants = require('../constants/rewardsConstants');
var _ = require('underscore');


var _rewards = [];

var RewardStore = _.extend({}, EventEmitter.prototype, {
    getRewards: function() {
        return _rewards;
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
        case RewardsConstants.GET_REWARDS:
            _rewards = action.data;
            RewardStore.emit('change');
            break;
        default:
            return true;

    }
});

module.exports = RewardStore;
