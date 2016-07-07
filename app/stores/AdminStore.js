var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants/constants');
var _ = require('underscore');

var _users = [],
    _roles = [],
    _user = {},
    _admin = {};

var AdminStore = _.extend({}, EventEmitter.prototype, {
    getAdmin: function() {
        return _admin;
    },
    getUsers: function() {
        return _users;
    },
    getUser: function() {
        return _user;
    },
    getRoles: function() {
        return _roles;
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

    switch (action.actionType) {
        case constants.ADMIN_GET_ADMIN:
            _admin = action.admin;
            AdminStore.emit('change');
            break;
        case constants.ADMIN_GET_USER:
            _user = action.user;
            AdminStore.emit('change');
            break;
        case constants.ADMIN_UPDATE_USER:
            _user = action.user;
            _users = action.users;
            AdminStore.emit('change');
            break;
        case constants.ADMIN_GET_USERS:
            _users = action.users;
            AdminStore.emit('change');
            break;
        case constants.ADMIN_GET_ROLES:
            _roles = action.roles;
            AdminStore.emit('change');
            break;
        default:
            return true;
    }
});

module.exports = AdminStore;
