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

        AdminActions.getGoal('/api/goals/' + this.props.params.id);

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
            deleteMode: false,
            errorMessage: ''
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
    _validForm: function() {
      this.setState({
        errorMessage: ''
      });

      if(this.state.goal.name === '' || this.state.goal.summary === '' || this.state.goal.description === '' || this.state.goal.points === '') {
        this.setState({
          errorMessage: 'Please fill all fields!'
        });

        return false;
      }

      return true;

    },
    _handleSubmit: function(e) {
        e.preventDefault();
      if(this._validForm()) {
        AdminActions.updateGoal(this.state.goal);
        this.context.router.push('/goals');
      }
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
            <div className="container-fluid admin-content">
                <div className="row">
                    <form onSubmit={this._handleSubmit} className="col-xs-12 col-sm-6 content-item-form">
                        {this.state.errorMessage !== ''
                        ? <label className="form-label error">{this.state.errorMessage}</label>
                        : null
                        }
                        <label htmlFor="name" className="form-label"><i className="fa fa-star"></i><span className="spacing"></span>Name</label>
                        <input className="form-field" id="name" type="text" value={this.state.goal.name} onChange={this._handleChange()} name="name" />
                        <label htmlFor="summary" className="form-label">Summary</label>
                        <textarea id="summary" className="form-field text-area" value={this.state.goal.summary} name="summary" onChange={this._handleChange()}></textarea>
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-field text-area" id="description" value={this.state.goal.description} name="description" onChange={this._handleChange()}></textarea>
                        <label htmlFor="points" className="form-label">Points</label>
                        <input className="form-field" id="points" type="number" value={this.state.goal.points} onChange={this._handleChange()} name="points" />
                        <div>
                            <button type="button" className="button delete" onClick={this._showConfirmationDialog}>Delete</button>
                            <input type="submit" className="button submit pull-right" value="Save" />
                        </div>
                        <div>
                            <Link to="/goals" className="button">Back</Link>
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
                        <button type="button" className="button" data-dismiss="modal" onClick={this._hideConfirmationDialog}>Close</button>
                        <button type="button" className="button delete" onClick={this._deleteGoal}>Accept</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
});

module.exports = GoalDetail;
