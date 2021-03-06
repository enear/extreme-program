var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants/constants');
var _ = require('underscore');


var _goals = [],
    _goal = {},
    _user = {},
    _maxPoints;

var GoalsStore = _.extend({}, EventEmitter.prototype, {
    getGoals: function() {
        return _goals.sort(this._compare);
    },
    getGoal: function() {
        return _goal;
    },
    getGoalById: function(id) {
        var obj = {};

        _goals.forEach(function(goal) {

            if(goal._id === id) {
                obj = goal;
            }
        });

        _goal = obj;

        return obj;
    },
    getMaxPoints: function() {
        return _maxPoints;
    },
    getUser: function(){
        return _user;
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    _compare: function(a, b) {
        var aName = a.name.toLowerCase(),
          bName = b.name.toLowerCase();

        if (aName < bName)
            return -1;
        if (aName > bName)
            return 1;
        return 0;
    },
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case constants.GET_GOALS:
            _goals = action.data;
            GoalsStore.emit('change');
            break;
        case constants.GET_GOAL:
            _goal = action.data;
            GoalsStore.emit('change');
            break;
        case constants.GET_USER:
            _user = action.user;
            GoalsStore.emit('change');
            break;
        case constants.SEND_REQUEST:
            _user = action.data;
            GoalsStore.emit('change');
            break;
        case constants.GET_MAX_POINTS:
            _maxPoints = action.maxPoints;
            GoalsStore.emit('change');
            break;
        default:
            return true;
    }
});

module.exports = GoalsStore;
