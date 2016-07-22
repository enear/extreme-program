var React = require('react');
var Link = require('react-router').Link;

var Intro = React.createClass({
    render: function() {
        return (
            <div className="col-xs-12 intro-message">
                <h2>Welcome to <span className="orange">e.</span>near Extreme program!</h2>

                <p>Here you can earn points applying for <Link className="link" to="/Goals">Goals</Link> and redeem them for <Link className="link" to="/rewards">Rewards</Link></p>

                <p>You can check how many points you have on you and view your activity history in your <Link className="link" to="/profile">Profile</Link></p>
            </div>
        )
    }
})

module.exports = Intro;
