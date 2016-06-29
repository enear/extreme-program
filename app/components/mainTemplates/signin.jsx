var React = require('react');

var SignIn = React.createClass({
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>This is the singin page!</h1>
                        <a href="/auth/slack">Sign in with Slack</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SignIn;
