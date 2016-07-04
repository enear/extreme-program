var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var ProfileConstants = require('../constants/profileConstants');
var _ = require('underscore');

var _user = {};

var ProfileStore = _.extend({}, EventEmitter.prototype, {
    getUser: function() {
        return _user;
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(callback);
    }

});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case ProfileConstants.GET_USER:
            _user = action.user;
            ProfileStore.emit('change');
            break;
        default:
            return true;
    }
});

module.exports = ProfileStore;
