var React = require('react');
var ReactDOM = require('react-dom');
var AdminActions = require('../actions/adminActions');

var Login = React.createClass({
    getInitialState: function() {
        return {
            email: "",
            password: ""
        };
    },
    _validForm: function() {
        return this.state.email.length >= 10 && this.state.email.indexOf('@') > -1 && this.state.email.indexOf('.') > -1 && this.state.password.length >= 4;
    },
    _handleSubmit: function(e) {
        e.preventDefault();

        if(this._validForm()){
            AdminActions.getAdmin('/?getuser=true');
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
                <form className="form-horizontal col-xs-12" action="/login" method="POST" onSubmit={this._handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input className="col-xs-12 col-sm-6 form-field"  type="email" id="email" name="email" onChange={this._handleChange()}/>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input className="col-xs-12 col-sm-6 form-field"  type="password" id="password" name="password" onChange={this._handleChange()} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="button submit" value="Submit" />
                    </div>
                </form>

                <p className="info-text">Not registered? <a href="/auth/slack"><img src="assets/slack-button.png" alt="Sign in with Slack" title="Sign in with Slack"/></a></p>
                <p className="info-text">Why Slack? We use it to validate your information before choosing your password</p>
            </div>
        );
    }
});

ReactDOM.render(<Login />, document.getElementById('login'));
