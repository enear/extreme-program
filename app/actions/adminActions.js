var AppDispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
var $ = require('jquery');

var AdminActions = {
    getUser: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.GET_USER,
                user: data
            });
        });
    },
    getUsers: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.GET_USERS,
                users: data
            });
        });
    }
};

module.exports = AdminActions;
