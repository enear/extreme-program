var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;

var RewardDetail = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
        this.props.checkPermission(this.props.permissions.Admin);

        AdminActions.getReward('/api/rewards/' + this.props.params.id);

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
            reward: AdminStore.getReward(),
            deleteMode: false,
            errorMessage: ''
        }
    },
    _handleChange: function() {
        return function(e) {
            var reward = this.state.reward;

            reward[e.target.name] = e.target.value;

            this.setState({
                reward: reward
            })
        }.bind(this);
    },
  _validForm: function() {
    this.setState({
      errorMessage: ''
    });

    if(this.state.reward.name === '' || this.state.reward.summary === '' || this.state.reward.description === '' || this.state.reward.points === '') {
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
            AdminActions.updateReward(this.state.reward);
            this.context.router.push('/rewards');
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
    _deleteReward: function() {
        AdminActions.deleteReward(this.state.reward);
        this.context.router.push('/rewards');
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
                        <label htmlFor="name" className="form-label"><i className="fa fa-trophy" aria-hidden="true"></i><span className="spacing"></span>Name</label>
                        <input id="name" type="text" className="form-field" value={this.state.reward.name} onChange={this._handleChange()} name="name" />
                        <label htmlFor="summary" className="form-label">Summary</label>
                        <textarea id="summary" className="form-field text-area" value={this.state.reward.summary} name="summary" onChange={this._handleChange()}></textarea>
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea id="description" className="form-field text-area" value={this.state.reward.description} name="description" onChange={this._handleChange()}></textarea>
                        <label htmlFor="points" className="form-label">Points</label>
                        <input id="points" className="form-field" type="number" value={this.state.reward.points} onChange={this._handleChange()} name="points" />
                        <div>
                            <button type="button" className="button delete" onClick={this._showConfirmationDialog}>Delete</button>
                            <input type="submit" className="button submit pull-right" value="Save" />

                        </div>
                        <div className="bottom-button-container">
                            <Link to="/rewards" className="button">Back</Link>
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
                          Are you sure you want to delete this reward?
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="button" data-dismiss="modal" onClick={this._hideConfirmationDialog}>Close</button>
                        <button type="button" className="button delete" onClick={this._deleteReward}>Accept</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
});

module.exports = RewardDetail;
