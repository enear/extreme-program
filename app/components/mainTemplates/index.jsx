var React = require('react');
var ReactDOM = require('react-dom');
var GoalList = require('../goals/goalList.jsx')
var RewardList = require('../rewards/rewardList.jsx');

var Index = React.createClass({
    render: function() {
        return (
            <div>
                <GoalList />
                <RewardList />
            </div>
        );
    }
});

ReactDOM.render( <Index />, document.getElementById('homepage'));
