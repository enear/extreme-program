var React = require('react');
var ReactDOM = require('react-dom');
var AdminActions = require('../actions/adminActions');

var Login = React.createClass({
    getInitialState: function() {
        return {
            username: "",
            password: "",
            usernameErrorMessage: '',
            passwordErrorMessage: ''
        };
    },
    _validForm: function() {
        this.setState({
            usernameErrorMessage: '',
            passwordErrorMessage: ''
        });

        if(this.state.username.length === 0) {
            this.setState({
                usernameErrorMessage: 'User field must be filled'
            });

            return false;
        }

        if(this.state.password.length === 0) {
            this.setState({
                passwordErrorMessage: 'Password must be filled'
            });

            return false;
        }

        if(this.state.password.length < 4) {
            this.setState({
                passwordErrorMessage: 'Incorrect Password format'
            });

            return false;
        }

        return true;

    },
    _handleSubmit: function(e) {
        e.preventDefault();

        if(this._validForm()){
            e.target.submit();
        }
    },
    _handleChange: function() {
        return function(e) {
            var state = {};
            state[e.target.name] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    render: function(){
        
        return (
            <div>
                <form className="form-horizontal col-xs-12" action="/login" method="POST" onSubmit={this._handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">User</label>
                        {this.state.usernameErrorMessage.length > 0
                        ?   <label className="form-label error">{this.state.usernameErrorMessage}</label>
                        :   null
                        }
                        <input className="col-xs-12 col-sm-6 form-field"  type="text" id="username" name="username" onChange={this._handleChange()}/>
                        {this.state.passwordErrorMessage.length > 0
                          ?   <label className="form-label error">{this.state.passwordErrorMessage}</label>
                          :   null
                        }
                        <label htmlFor="password" className="form-label">Password</label>
                        <input className="col-xs-12 col-sm-6 form-field"  type="password" id="password" name="password" onChange={this._handleChange()} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="button submit" value="Submit" />
                    </div>
                </form>

                <p className="info-text"><span className="bold">Or</span></p>
                <p className="info-text"><a href="/auth/slack"><img src="assets/slack-button.png" alt="Sign in with Slack" title="Sign in with Slack"/></a></p>
            </div>
        );
    }
});

ReactDOM.render(<Login />, document.getElementById('login'));