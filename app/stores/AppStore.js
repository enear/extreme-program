var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/appConstants');
var _ = require('underscore');

var _user = {};

var AppStore = _.extend({}, EventEmitter.prototype, {
    getUser: function() {
        return _user;
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

//TODO: react-router is throwing a warning due to the re-render after setting the new user state.
//TODO: make the index component make this call

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case AppConstants.GET_USER:
            _user = action.user;
            AppStore.emit('change');
            break;
        default:
            return true;
    }
});

module.exports = AppStore;
