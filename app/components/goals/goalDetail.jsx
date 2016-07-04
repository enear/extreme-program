var React = require('react');
var GoalsStore = require('../../stores/GoalsStore');
var GoalsActions = require('../../actions/goalsActions');
var Link = require('react-router').Link;


var GoalDetail = React.createClass({
    getInitialState: function() {
        return {
            goal: GoalsStore.getGoalById(this.props.params.id),
            user: GoalsStore.getUser()
        };
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
            goal: GoalsStore.getGoal(),
            user: GoalsStore.getUser()
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
                        <form  className="form-horizontal col-xs-12" action="/" method="POST"  >
                            <div className="form-group">
                                <input type="hidden" name="user"/>
                                <input type="hidden" name="goal" />
                                <input type="hidden" name="points" />
                                <label for="Comment" className="col-xs-12">Comment</label>
                                <textarea className="form-control col-xs-12" id="comment"></textarea>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
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
