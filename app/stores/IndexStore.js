var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var IndexConstants = require('../constants/indexConstants');
var _ = require('underscore');

var _user = {};

var IndexStore = _.extend({}, EventEmitter.prototype, {
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

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case IndexConstants.GET_USER:
            _user = action.user;
            IndexStore.emit('change');
            break;
        case IndexConstants.SEND_REQUEST:
            _user = action.data;
            IndexStore.emit('change');
            break;
        default:
            return true;
    }
});

module.exports = IndexStore;
