var AppDispatcher = require('../dispatcher/dispatcher');
var RewardsConstants = require('../constants/rewardsConstants');
var $ = require('jquery');

var RewardActions = {
    getRewards: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: RewardsConstants.GET_REWARDS,
                data: data
            });
        });
    },
    getReward: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: RewardsConstants.GET_REWARD,
                data: data
            });
        });
    }
};

module.exports = RewardActions;
