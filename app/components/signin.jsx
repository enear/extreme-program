var React = require('react');
var ReactDOM = require('react-dom');
var SigninStore = require('../stores/SigninStore');
var SigninActions = require('../actions/signinActions');
var $ = require('jquery');


var SignIn = React.createClass({
    getInitialState: function() {
        return {
            password: "",
            confirmPassword: "",
            errorMessage: ""
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
        this.setState({
            errorMessage: ''
        });

        if(this.state.password === '' || this.state.confirmPassword === '') {
            this.setState({
              errorMessage: "All fields must be filled!"
            });

            return false;
        }

        if(!this._matchingPasswords()) {
            this.setState({
                errorMessage: "Passwords don't match!"
            });

            return false;
        }

        return true;
    },
    _matchingPasswords: function() {
        return this.state.password === this.state.confirmPassword;
    },
    _handleChange: function(key) {
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
                    {this.state.errorMessage !== ''
                    ?   <label className="form-label error">{this.state.errorMessage}</label>
                    :   null
                    }
                    <label htmlFor="password" className="form-label">Password</label>
                    <input className="col-xs-12 col-sm-6 form-field"  type="password" id="password" name="password" onChange={this._handleChange('password')} />
                    <label htmlFor="confirmPassword" className="form-label">Confirm your password</label>
                    <input className="col-xs-12 col-sm-6 form-field" type="password" id="confirmPassword" name="confirmPassword" onChange={this._handleChange('confirmPassword')} />
                </div>
                <div className="form-group">
                    <button type="submit" className="button submit">Submit</button>
                </div>
            </form>
        );
    }
});

ReactDOM.render(<SignIn />, document.getElementById('signin'));
