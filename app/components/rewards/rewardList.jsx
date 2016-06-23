var React = require('react');
var Reward = require('./reward.jsx');

var RewardList = React.createClass({
    render: function() {
        return (
            <div id="reward-list" className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h2 className="reward-list-title">Rewards</h2>
                        <p className="reward-list-paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <Reward />
                    <Reward />
                    <Reward />
                </div>
            </div>
        );
    }
});

module.exports = RewardList;
