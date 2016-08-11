var AppDispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
var $ = require('jquery');


var GoalsActions = {
    getGoals: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.GET_GOALS,
                data: data
            });
        });
    },
    getGoal: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.GET_GOAL,
                data: data
            });
        });
    },
    getMaxPoints: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.GET_MAX_POINTS,
                maxPoints: data.maxUserPoints
            });
        });
    },
    sendRequest: function(request) {
        console.log(request);
        $.post("/api/users/" + request.userID, request, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.SEND_REQUEST,
                data: data.user
            });
        });
    }
};

module.exports = GoalsActions;
