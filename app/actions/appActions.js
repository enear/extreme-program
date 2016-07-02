var AppDispatcher = require('../dispatcher/dispatcher');
var appConstants = require('../constants/appConstants');
var $ = require('jquery');

var AppActions = {
    getUser: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: appConstants.GET_USER,
                user: data
            });
        });
    }
};

module.exports = AppActions;
