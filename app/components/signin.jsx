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
    handleSubmit: function(e) {
        e.preventDefault();

        if(this._validForm()){
            e.target.submit();
        }
    },
    render: function(){
        return (
            <form  className="form-horizontal col-xs-12" action="/signin" method="POST" onSubmit={this.handleSubmit} >
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input className="col-xs-12 col-sm-6 form-field"  type="password" id="password" name="password" onBlur={this._handleBlur('password')} />
                    <label htmlFor="confirmPassword" className="form-label">Confirm your password</label>
                    <input className="col-xs-12 col-sm-6 form-field" type="password" id="confirmPassword" name="confirmPassword" onBlur={this._handleBlur('confirmPassword')} />
                </div>
                <div className="form-group">
                    <button type="submit" className="button submit">Submit</button>
                </div>
            </form>
        );
    }
});

ReactDOM.render(<SignIn />, document.getElementById('signin'));
