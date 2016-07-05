var AppDispatcher = require('../dispatcher/dispatcher');
var profileConstants = require('../constants/profileConstants');
var $ = require('jquery');

var profileActions = {
    getUser: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: profileConstants.GET_USER,
                user: data
            });
        });
    },
    changePassword: function(request) {
        console.log(request);
        $.post('/api/users/' + request.user._id, request, function(data) {
            console.log(data);
            AppDispatcher.handleAction({
                actionType: profileConstants.CHANGE_PASSWORD,
                user: data
            });
        });
    }
};

module.exports = profileActions;
