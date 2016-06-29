var React = require('react');
var GoalList = require('../goals/goalList.jsx');
var RewardList = require('../rewards/rewardList.jsx');
var NavBar = require('../navBar/navBar.jsx');

var Index = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar />
                {this.props.children}
            </div>
        );
    }
});

module.exports = Index;
