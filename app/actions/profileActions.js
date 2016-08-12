var AppDispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
var $ = require('jquery');

var profileActions = {
    getUser: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.GET_USER,
                user: data
            });
        });
    },
    changePassword: function(request) {
        $.post('/api/users/' + request.userID, request, function(data) {


            AppDispatcher.handleAction({
                actionType: constants.CHANGE_PASSWORD,
                user: data.user,
                passwordState: data.passwordState
            });
        });
    },
    resetPasswordState: function() {
        AppDispatcher.handleAction({
            actionType: constants.RESET_PASSWORD_STATE
        })

    }
};

module.exports = profileActions;
