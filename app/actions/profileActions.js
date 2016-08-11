var AppDispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants/constants');
var $ = require('jquery');

var profileActions = {
    getUser: function(url) {
        $.getJSON(url, function(data) {
            AppDispatcher.handleAction({
                actionType: constants.GET_USER,
                user: data
            });
        });
    },
    //TODO: Notice if password was changed successfully or not.
    changePassword: function(request) {
        $.post('/api/users/' + request.userID, request, function(data) {
            var passwordState = '';

            //This will always be true because the password is encrypted in the BE and it's being compared with the 'unencrypted' one in the FE.
            if(data.password !== request.password && data.password !== request.newPassword) {
                passwordState = 'Wrong Password!';
            }

            if(data.password === request.newPassword) {
                passwordState = 'Password Changed with success!';
            }


            AppDispatcher.handleAction({
                actionType: constants.CHANGE_PASSWORD,
                user: data,
                passwordState: passwordState
            });
        });
    }
};

module.exports = profileActions;
