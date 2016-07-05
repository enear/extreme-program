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
        console.log(request);
        $.post('/api/users/' + request.user._id, request, function(data) {
            console.log(data);
            AppDispatcher.handleAction({
                actionType: constants.CHANGE_PASSWORD,
                user: data
            });
        });
    }
};

module.exports = profileActions;
