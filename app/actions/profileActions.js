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
    }
};

module.exports = profileActions;
