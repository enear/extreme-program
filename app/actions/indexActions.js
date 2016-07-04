var AppDispatcher = require('../dispatcher/dispatcher');
var indexConstants = require('../constants/indexConstants');
var $ = require('jquery');

var IndexActions = {
    getUser: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: indexConstants.GET_USER,
                user: data
            });
        });
    }
};

module.exports = IndexActions;
