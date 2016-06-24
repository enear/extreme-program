var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var GoalsConstants = require('../constants/goalsConstants');

var _ = require('underscore');

var _goals = [];


var GoalsStore = _.extend({}, EventEmitter.prototype, {
    getGoals: function() {
        console.log("_goals:");
        console.log(_goals);
        return _goals;
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case GoalsConstants.GET_GOALS:
            console.log(action);
            _goals = action.data;
            GoalsStore.emit('change');
            break;

        default:
            return true;
    }
});

module.exports = GoalsStore;
