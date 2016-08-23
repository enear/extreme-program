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
            user: GoalsStore.getUser(),
            maxPoints: GoalsStore.getMaxPoints(),
            warning: false,
            warningMessage: ''
        };
    },
    componentWillMount: function() {
        if(Object.keys(this.state.goal).length === 0) {
            GoalsActions.getGoal('/api/goals/' + this.props.params.id);
        }

        if(typeof this.state.maxPoints === 'undefined') {
            GoalsActions.getMaxPoints('/api/settings');
        }
        GoalsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        GoalsStore.removeChangeListener(this._onChange);
    },
    _handleSubmit: function(e) {
        e.preventDefault();

        if(this._allowedToRequest()) {
            if(this._userHasGoal() && this._awardPointsOnce()){
                var goal = this.state.goal;

                goal.points = 0;

                this.setState( {

                    warningMessage: "You've already applied once for this goal, and you will only earn points ONCE for this Goal.",
                    warning: true,
                    goal: goal
                });
            }
            else {
                this._submit();
            }
        }
        else {
            this.setState( {
                warningMessage: "You've reached the maximum points allowed per user. Please redeem some rewards first or contact an admin.",
                warning: true
            })
        }
    },
    _allowedToRequest: function() {
      return this.state.user.totalPoints + this.state.goal.points < this.state.maxPoints;
    },
    _userHasGoal: function() {
        var that = this;

        var result = this.state.user.requests.filter(function(obj) {
            return obj.subject._id == that.state.goal._id;
        });

        return result.length > 0;
    },
    _awardPointsOnce: function(){
      return this.state.goal.pointsOnce;
    },
    _submit: function() {
        var date = new Date();

        var request = {
            userID: this.state.user._id,
            action: 'submitNewRequest',
            newRequest: {
                type: "Goal",
                collection: 'goals',
                name: this.state.goal.name,
                points: this.state.goal.points,
                summary: this.state.goal.summary,
                description: "Applied for a Goal - " + this.state.goal.name ,
                comment: this.state.comment,
                date: date,
                id: date.getTime(),
                state: "Pending",
                subject: this.state.goal
            }
        };

        this.setState({
            warningMessage: ''
        });

        GoalsActions.sendRequest(request);

        this.context.router.push('/goals');
    },
    _onChange: function() {
        this.setState(
            this._getState()
        );
    },
    _getState: function() {
        return {
            goal: GoalsStore.getGoal(),
            user: GoalsStore.getUser(),
            maxPoints: GoalsStore.getMaxPoints(),
            warning: false,
            warningMessage: ''
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
                        <p>{(this.state.goal.points || '').toLocaleString('pt')}</p>
                        <form onSubmit={this._handleSubmit}  >
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
                <div id="confirmation" className={this.state.warning ? "modal show" : "modal"}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <Link type="button" className="close" data-dismiss="modal" aria-hidden="true" to="/">&times;</Link>
                                <h4 className="modal-title">Confirmation</h4>
                            </div>
                            <div className="modal-body">
                                {this.state.warningMessage}

                            </div>
                            <div className="modal-footer">
                                {this._allowedToRequest()
                                ?   <button type="button" className="button submit" onClick={this._submit} >Send Anyway</button>
                                :   null}
                                <Link type="button" className="button" data-dismiss="modal" to="/">Close</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
});

module.exports = GoalDetail;
