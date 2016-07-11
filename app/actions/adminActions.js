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
    },
    getRewards: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.ADMIN_GET_REWARDS,
                rewards: data
            });
        });
    },
    getReward: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.ADMIN_GET_REWARD,
                reward: data
            });
        });
    },
    updateReward: function(reward) {
        $.post('/api/rewards/' + reward._id, reward, function(updatedReward) {
            $.getJSON('/api/rewards', function(rewards) {
                AppDispatcher.handleAction({
                    actionType: constants.ADMIN_UPDATE_REWARD,
                    reward: updatedReward,
                    rewards: rewards
                });
            });
        });
    },
    createReward: function(reward) {
        $.post('/api/rewards/', reward, function(newReward) {
            $.getJSON('/api/rewards', function(rewards) {
                AppDispatcher.handleAction( {
                    actionType: constants.ADMIN_CREATE_REWARD,
                    reward: newReward,
                    rewards: rewards
                });
            });
        });
    }
};

module.exports = AdminActions;
