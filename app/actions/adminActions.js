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
    },
    getRoles: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.GET_ROLES,
                roles: data
            });
        });
    },
    changeUserRole: function(request) {
        $.post(request.url, request, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.CHANGE_ROLE,
                user: data
            });
        });
    }
};

module.exports = AdminActions;
