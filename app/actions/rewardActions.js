var AppDispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
var $ = require('jquery');

var RewardActions = {
    getRewards: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.GET_REWARDS,
                data: data
            });
        });
    },
    getReward: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.GET_REWARD,
                data: data
            });
        });
    }
};

module.exports = RewardActions;
