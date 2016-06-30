var React = require('react');
var ReactDOM = require('react-dom');
var SigninStore = require('../stores/SigninStore');
var SigninActions = require('../actions/SigninActions');
var $ = require('jquery');


//TODO: validate password and check if it matches the confirm password field
var SignIn = React.createClass({
    getInitialState: function() {
        return {
            user: {}
        };
    },
    componentWillMount: function() {
        SigninStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        SigninStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState (
            this._getState()
        );
    },
    _getState: function() {
        return {
            user: SigninStore.getUser()
        }
    },
    _getUrlParam: function(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }

    },
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>This is the singin page!</h1>
                        <p>Please select your password</p>
                        <form action="/signin" method="POST">
                            <input type="text" name="password" value="" />
                            <input type="submit" value="send" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<SignIn />, document.getElementById("signin"));
