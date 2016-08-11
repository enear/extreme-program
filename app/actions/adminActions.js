var AppDispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
var $ = require('jquery');

var AdminActions = {
    getAdmin: function(url) {
        $.getJSON(url, function(data) {
            if(data.role === 'Standard') {
                data = {};
            }
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
        $.post(request.url, request, function(data) {
            $.get('/api/users', function(users) {
                AppDispatcher.handleAction({
                    actionType: constants.ADMIN_UPDATE_USER,
                    user: data.user,
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
    },
    deleteReward: function(reward) {
        $.ajax({
            url: '/api/rewards/' + reward._id,
            method: 'DELETE',
            success: function(data) {
                $.getJSON('/api/rewards', function(rewards){
                    AppDispatcher.handleAction({
                        actionType: constants.ADMIN_DELETE_REWARD,
                        rewards: rewards,
                        reward: {}
                    });
                });
            }
        });
    },
    getGoals: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.ADMIN_GET_GOALS,
                goals: data
            });
        });
    },
    getGoal: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.ADMIN_GET_GOAL,
                goal: data
            });
        });
    },
    createGoal: function(goal) {
        $.post('/api/goals/', goal, function(newGoal) {
            $.getJSON('/api/goals', function(goals) {
                AppDispatcher.handleAction( {
                    actionType: constants.ADMIN_CREATE_GOAL,
                    goal: newGoal,
                    goals: goals
                });
            });
        });
    },
    updateGoal: function(goal) {
        $.post('/api/goals/' + goal._id, goal, function(updatedGoal) {
            $.getJSON('/api/goals', function(goals) {
                AppDispatcher.handleAction({
                    actionType: constants.ADMIN_UPDATE_GOAL,
                    goal: updatedGoal,
                    goals: goals
                });
            });
        });
    },
    deleteGoal: function(goal) {
        $.ajax({
            url: '/api/goals/' + goal._id,
            method: 'DELETE',
            success: function(data) {
                $.getJSON('/api/goals', function(goals){
                    AppDispatcher.handleAction({
                        actionType: constants.ADMIN_DELETE_GOAL,
                        goals: goals,
                        goal: {}
                    });
                });
            }
        });
    },
    getRequestStates: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.ADMIN_GET_REQUESTSTATES,
                requestStates: data
            });
        });
    },
    getSettings: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.ADMIN_GET_SETTINGS,
                settings: data
            });
        });
    },
    updateSettings: function(settings) {
        $.post('/api/settings', settings, function(data) {
           AppDispatcher.handleAction({
               actionType: constants.ADMIN_UPDATE_SETTINGS,
               settings: data
           }) ;
        });
    },
    setRequest: function(payload) {
        AppDispatcher.handleAction({
            actionType: constants.ADMIN_GET_REQUEST,
            request: payload
        });
    },
    getRequestById: function(id) {
        AppDispatcher.handleAction({
            actionType: constants.ADMIN_GET_REQUEST_BY_ID,
            id: id
        });
    }
};

module.exports = AdminActions;
