var React = require('react');
var ReactDOM = require('react-dom');
var SigninStore = require('../stores/SigninStore');
var SigninActions = require('../actions/signinActions');
var $ = require('jquery');


var SignIn = React.createClass({
    getInitialState: function() {
        return {
            password: "",
            confirmPassword: ""
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
    _validForm: function() {
        return this.state.password.length >= 4 && this.state.confirmPassword.length >= 4 && this._matchingPasswords();
    },
    _matchingPasswords: function() {
        return this.state.password === this.state.confirmPassword;
    },
    _handleBlur: function(key) {
        return function(e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    sendData: function(e) {
        e.preventDefault();
        console.log(this._validForm());
    },
    render: function(){
        return (
            <div id="signinComponent" className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>This is the singin page!</h1>
                        <p>Please select your password</p>
                        <form  className="form-horizontal" onSubmit={this.sendData}>
                            <div className="form-group">
                                <label for="password" className="col-xs-12">Password</label>
                                <input className="col-xs-12 form-control"  type="text" id="password" name="password" onBlur={this._handleBlur('password')} />
                                <label for="confirmPassword" className="col-xs-12">Confirm your password</label>
                                <input className="col-xs-12 form-control" type="text" id="confirmPassword" name="confirmPassword" onBlur={this._handleBlur('confirmPassword')} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<SignIn />, document.getElementById("signin"));
