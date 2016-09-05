var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants/constants');
var _ = require('underscore');

var _users = [],
    _roles = [],
    _rewards = [],
    _goals = [],
    _requests = [],
    _requestStates = [],
    _totalPoints = 0,
    _user = {},
    _admin = {},
    _reward = {},
    _goal = {},
    _request = {},
    _settings = {};

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
    getRewards: function() {
        return _rewards.sort(this._compare("name"));
    },
    getReward: function() {
        return _reward;
    },
    getGoals: function() {
        return _goals.sort(this._compare("name"));
    },
    getGoal: function() {
        return _goal;
    },
    getNewRequests: function() {
        return _requests.sort(this._compare("date"));
    },
    getRequestById: function(id) {
        _request = {};

        for(var i = 0, l = _requests.length; i < l; i+=1) {
            if(_requests[i].id === id) {
                _request = _requests[i];
                break;
            }
        }

        return _request;
    },
    getRequest :function() {
        return _request;
    },
    getRequestStates: function() {
        return _requestStates;
    },
    getSettings: function() {
        return _settings;
    },
    getNewUsers: function() {
        var users = [],
        that = this;

        _users.forEach(function(user) {
            if(that._dayDiff(new Date(user.created) - new Date()) <= 7) {
                users.push(user);
            }
        });

        return users;
    },
    getTotalPoints: function() {
        _users.forEach(function(user) {
            _totalPoints += user.totalPoints;
        });

        return _totalPoints;
    },
    _updateRequests: function() {
        _requests = [];
        if(_users.length > 0) {
            _users.forEach(function(user) {
                user.requests.forEach(function(request) {
                    if(request.state === 'Pending') {
                        request.user = user._id;
                        request.userName = user.email;
                        _requests.push(request);
                    }
                });
            });
        }
    },
    _dayDiff: function(date1, date2) {
        var timeDiff = Math.abs(date1.getTime() - date2.getTime());
        return(Math.ceil(timeDiff / (1000 * 3600 * 24)));
    },
    _compare: function(prop) {
        return function(a, b) {
            var isDate = prop === 'date',
              aComp = isDate ? new Date(a[prop]) : a[prop].toLowerCase(),
              bComp = isDate ? new Date(b[prop]) :  b[prop].toLowerCase();

            if (aComp < bComp)
                return isDate ? 1 : -1;
            if (aComp > bComp)
                return isDate ? -1 : 1;
            return 0;
        }
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
            AdminStore._updateRequests();
            AdminStore.emit('change');
            break;
        case constants.ADMIN_UPDATE_USER:
            _user = action.user;
            _users = action.users;
            AdminStore._updateRequests();
            AdminStore.emit('change');
            break;
        case constants.ADMIN_GET_USERS:
            _users = action.users;
            AdminStore._updateRequests();
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
        case constants.ADMIN_GET_GOALS:
            _goals = action.goals;
            AdminStore._updateRequests();
            AdminStore.emit('change');
            break;
        case constants.ADMIN_GET_GOAL:
            _goal = action.goal;
            AdminStore._updateRequests();
            AdminStore.emit('change');
            break;
        case constants.ADMIN_UPDATE_GOAL:
        case constants.ADMIN_DELETE_GOAL:
        case constants.ADMIN_CREATE_GOAL:
            _goal = action.goal;
            _goals = action.goals;
            AdminStore._updateRequests();
            AdminStore.emit('change');
            break;
        case constants.ADMIN_GET_REQUESTSTATES:
            _requestStates = action.requestStates;
            AdminStore.emit('change');
            break;
        case constants.ADMIN_GET_SETTINGS:
        case constants.ADMIN_UPDATE_SETTINGS:
            _settings = action.settings;
            AdminStore.emit('change');
            break;
        case constants.ADMIN_GET_REQUEST:
            _request = action.request;
            AdminStore.emit('change');
            break;
        case constants.ADMIN_GET_REQUEST_BY_ID:

            break;
        default:
            return true;
    }
});

module.exports = AdminStore;
