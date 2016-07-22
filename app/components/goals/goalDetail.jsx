var React = require('react');
var GoalsStore = require('../../stores/GoalsStore');
var GoalsActions = require('../../actions/goalsActions');
var Router = require('react-router');

var Link = require('react-router').Link;


var GoalDetail = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
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
    handleSubmit: function(e) {
        e.preventDefault();
        var date = new Date();

        var request = {
            user: this.state.user,
            action: 'submitNewRequest',
            newRequest: {
                name: this.state.goal.name,
                points: this.state.goal.points,
                summary: this.state.goal.summary,
                comment: this.state.comment,
                date: date,
                id: date.getTime(),
                state: "Pending"
            }
        };

        GoalsActions.sendRequest(request);

        this.context.router.push('/');
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
    _handleBlur: function() {
        return function(e) {
            var state = {};
            state[e.target.name] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    render: function() {
        return (
            <div className="container goal-detail">
                <div className="row">
                    <div className="content-item col-xs-12 col-sm-6">
                        <h3 className="content-item-title"><i className="fa fa-star"></i><span className="spacing"></span>{this.state.goal.name}</h3>
                        <label className="form-label">Description</label>
                        <p>{this.state.goal.description}</p>
                        <label className="form-label">Points</label>
                        <p>{this.state.goal.points}</p>
                        <form onSubmit={this.handleSubmit}  >
                                <label htmlFor="Comment" className="form-label">Comment</label>
                                <textarea className="form-field text-area" id="comment" name="comment" onBlur={this._handleBlur()}></textarea>
                            <div className="form-group">
                                <button type="submit" className="button submit">Submit</button>
                            </div>
                        </form>
                        <div>
                            <Link to="/goals" className="button">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
});

module.exports = GoalDetail;
