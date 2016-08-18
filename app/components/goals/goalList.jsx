var React = require('react');
var Goal = require('./goalListItem.jsx');
var GoalsStore = require('../../stores/GoalsStore');
var GoalsActions = require('../../actions/goalsActions');
var Link = require('react-router').Link;


var GoalList = React.createClass({
    getInitialState: function(){
        return this._getState();
    },
    componentWillMount: function() {
        GoalsActions.getGoals('/api/goals?published=true');
        GoalsStore.addChangeListener(this._onChange);

    },
    componentWillUnmount: function() {
        GoalsStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(
            this._getState()
        );
    },
    _getState: function() {
        return {
            goals: GoalsStore.getGoals()
        }
    },
    render: function() {
        return (
            <div id="goal-list" className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h2 className="goal-list-title">Goals</h2>
                        <p className="goal-list-paragraph">
                            You can apply for any of these Goals in order to win points, and to redeem them for <Link to="/rewards">Rewards</Link>. Your request will be revised by an admin in order to award you the points.
                        </p>
                    </div>
                </div>
                <div className="row">
                    {this.state.goals.map(function(goal, index) {
                        return (
                            <Goal key={index} goal={goal} />
                        )
                    })}
                </div>
            </div>
        );
    }
});

module.exports = GoalList;
