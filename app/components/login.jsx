var React = require('react');
var ReactDOM = require('react-dom');

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
            e.target.submit();
        }
    },
    _handleBlur: function(key) {
        return function(e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>This is the login page!</h1>
                        <form  className="form-horizontal col-xs-12" action="/login" method="POST" onSubmit={this._handleSubmit} >
                            <div className="form-group">
                                <label for="email" className="col-xs-12">Email</label>
                                <input className="col-xs-12 form-control"  type="email" id="email" name="email" onBlur={this._handleBlur('email')}/>
                                <label for="password" className="col-xs-12">Password</label>
                                <input className="col-xs-12 form-control"  type="password" id="password" name="password" onBlur={this._handleBlur('password')} />
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary" value="Submit" />
                            </div>
                        </form>

                        <p>Not registered? <a href="/auth/slack">Sign in with Slack</a></p>

                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<Login />, document.getElementById('login'));
