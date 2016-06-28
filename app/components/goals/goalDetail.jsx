var React = require('react');
var GoalsStore = require('../../stores/GoalsStore');
var GoalsActions = require('../../actions/goalsActions');
var Link = require('react-router').Link;


var GoalDetail = React.createClass({
    getInitialState: function() {
        return {
            goal: GoalsStore.getGoalById(this.props.params.id)
        }
    },
    componentWillMount: function() {
        if(Object.keys(this.state.goal).length === 0) {
            GoalsActions.getGoal('/api/goals/' + this.props.params.id);
        }
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
            goal: GoalsStore.getGoal()
        }
    },
    render: function() {
        return (
            <div className="container goal-detail">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <img  src="/assets/goal.jpg" alt="name" title="name" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <h3>{this.state.goal.name}</h3>
                        <p>{this.state.goal.description}</p>
                        <div>
                            {this.state.goal.points}
                        </div>
                        <div>
                            <Link to="/" className="btn btn-default">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
});

module.exports = GoalDetail;
