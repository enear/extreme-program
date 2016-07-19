var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;

var GoalDetail = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
        this.props.checkPermission(this.props.permissions.Admin);

        if(Object.keys(this.state.goal).length === 0  || this.state.goal._id !== this.props.params.id) {
            AdminActions.getGoal('/api/goals/' + this.props.params.id);
        }
        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        AdminStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(
            this._getState()
        )
    },
    _getState: function() {
        return {
            goal: AdminStore.getGoal(),
            deleteMode: false
        }
    },
    _handleChange: function() {
        return function(e) {
            var goal = this.state.goal;

            goal[e.target.name] = e.target.value;

            this.setState({
                goal: goal
            })
        }.bind(this);
    },
    _handleSubmit: function(e) {
        e.preventDefault();
        AdminActions.updateGoal(this.state.goal);
    },
    _hideConfirmationDialog: function() {
        this._handleConfirmation(false);
    },
    _showConfirmationDialog: function() {
        this._handleConfirmation(true);
    },
    _handleConfirmation: function(show) {
        this.setState(
            {
                deleteMode:show
            }
        )
    },
    _deleteGoal: function() {
        AdminActions.deleteGoal(this.state.goal);
        this.context.router.push('/goals');
    },
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this._handleSubmit}>
                        <div className="col-xs-12">
                            <input type="test" value={this.state.goal.name} onChange={this._handleChange()} name="name" />
                        </div>
                        <div className="col-xs-12">
                            <textarea value={this.state.goal.summary} name="summary" onChange={this._handleChange()}></textarea>
                        </div>
                        <div className="col-xs-12">
                            <textarea value={this.state.goal.description} name="description" onChange={this._handleChange()}></textarea>
                        </div>
                        <div className="col-xs-12">
                            <input type="number" value={this.state.goal.points} onChange={this._handleChange()} name="points" />
                        </div>
                        <div>
                            <Link to="/goals" className="btn btn-default">Back</Link>
                            <button type="button" className="btn btn-danger" onClick={this._showConfirmationDialog}>Delete</button>
                        </div>
                        <div>
                            <input type="submit" className="btn btn-primary" value="Save" />
                        </div>

                    </form>
                </div>
                <div id="confirmation" className={this.state.deleteMode ? "modal show" : "modal"}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this._hideConfirmationDialog}>&times;</button>
                        <h4 className="modal-title">Confirmation</h4>
                      </div>
                      <div className="modal-body">
                          Are you sure you want to delete this Goal?
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this._hideConfirmationDialog}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={this._deleteGoal}>Accept</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
});

module.exports = GoalDetail;
