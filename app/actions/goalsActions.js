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
    sendRequest: function(request) {
        $.post("/api/users/" + request.user._id, request, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.SEND_REQUEST,
                data: data
            });
        });
    }
};

module.exports = GoalsActions;
