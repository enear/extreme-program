var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants/constants');
var _ = require('underscore');

var _users = [],
    _roles = [],
    _rewards = [],
    _user = {},
    _admin = {},
    _reward = {};

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
    getRewards: function(){
        return _rewards;
    },
    getReward: function() {
        return _reward;
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
        case constants.ADMIN_GET_REWARDS:
            _rewards = action.rewards;
            AdminStore.emit('change');
            break;
        case constants.ADMIN_GET_REWARD:
            _reward = action.reward;
            AdminStore.emit('change');
            break;
        case constants.ADMIN_UPDATE_REWARD:
        case constants.ADMIN_CREATE_REWARD:
        case constants.ADMIN_DELETE_REWARD:
            _reward = action.reward;
            _rewards = action.rewards;
            AdminStore.emit('change');
            break;
        default:
            return true;
    }
});

module.exports = AdminStore;
