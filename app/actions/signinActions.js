var AppDispatcher = require('../dispatcher/dispatcher');
var SigninConstants = require('../constants/signinConstants');
var $ = require('jquery');

var SigninActions = {
    getUser: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: SigninConstants.GET_USER,
                user: data
            });
        });
    }
};

module.exports = SigninActions;
