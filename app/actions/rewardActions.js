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
    },
    sendReward: function(request) {
        $.post('/api/users/' + request.userID, request, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.SEND_REWARD,
                data: data.user
            });
        });
    }
};

module.exports = RewardActions;
