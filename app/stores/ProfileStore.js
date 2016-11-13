var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants/constants');
var _ = require('underscore');

var _user = {},
    _passwordState = '';


var ProfileStore = _.extend({}, EventEmitter.prototype, {
    getUser: function() {
        return _user;
    },
    getPasswordState: function() {
      return _passwordState;
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
        case constants.GET_USER:
            _user = action.user;

            ProfileStore.emit('change');
            break;

        case constants.CHANGE_PASSWORD:
            _user = action.user;
            _passwordState = action.passwordState;

            ProfileStore.emit('change');
            break;
        case constants.RESET_PASSWORD_STATE:
            _passwordState = '';

            break;
        case constants.SEND_REQUEST:
        case constants.SEND_REWARD:
            _user = action.data;
            break;
        default:
            return true;
    }
});

module.exports = ProfileStore;
