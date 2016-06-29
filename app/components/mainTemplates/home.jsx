var React = require('react');
var GoalList = require('../goals/goalList.jsx');
var RewardList = require('../rewards/rewardList.jsx');
var NavBar = require('../navBar/navBar.jsx');

var Home = React.createClass({
    render: function() {
        return (
            <div>
                <div id="mainContainer" className="text-center">
                    <div className="text-container">
                        <h2>Welcome to the E.Near Extreme Program</h2>
                        <p>This is the place where you can trade your 'points' for rewards</p>
                        <p>Scroll down to check the goals and rewards catalogs</p>
                    </div>
                </div>
                <GoalList />
                <RewardList />
            </div>
        );
    }
});

module.exports = Home;
