var AppDispatcher = require('../dispatcher/dispatcher');
var GoalsConstants = require('../constants/goalsConstants');
var $ = require('jquery');


var GoalsActions = {
    getGoals: function(url) {
        $.getJSON(url, function(data) {
            console.log(data);
            AppDispatcher.handleAction({
                actionType: GoalsConstants.GET_GOALS,
                data: data
            });
        });
    }
};

module.exports = GoalsActions;
