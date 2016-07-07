var AppDispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
var $ = require('jquery');

var AdminActions = {
    getAdmin: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.ADMIN_GET_ADMIN,
                admin: data
            });
        });
    },
    getUser: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.ADMIN_GET_USER,
                user: data
            });
        });
    },
    getUsers: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.ADMIN_GET_USERS,
                users: data
            });
        });
    },
    getRoles: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.ADMIN_GET_ROLES,
                roles: data
            });
        });
    },
    updateUser: function(request) {
        $.post(request.url, request, function(user) {
            $.get('/api/users', function(users) {
                AppDispatcher.handleAction({
                    actionType: constants.ADMIN_UPDATE_USER,
                    user: user,
                    users: users
                });
            });
        });
    }
};

module.exports = AdminActions;
