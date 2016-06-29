var React = require('react');
var Link = require('react-router').Link;

var Login = React.createClass({
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>This is the login page!</h1>
                        Not registered? <Link to="/signin">Sign in</Link>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Login;
