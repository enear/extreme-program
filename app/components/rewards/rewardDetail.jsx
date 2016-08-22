var React = require('react');
var RewardsStore = require('../../stores/RewardsStore');
var RewardsActions = require('../../actions/rewardActions');
var Link = require('react-router').Link;


var RewardDetail = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return this._getState();
    },
    componentWillMount: function() {
        if(Object.keys(this.state.reward).length === 0) {
            RewardsActions.getReward('/api/rewards/' + this.props.params.id);
        }

        RewardsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        RewardsStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(
            this._getState()
        )
    },
    _getState: function() {
        return {
            reward: RewardsStore.getReward(),
            user: RewardsStore.getUser(),
            confirmation: false
        }
    },
    _requestApplication: function() {
        if(this._affordReward()){
          var date = new Date();

            RewardsActions.sendReward({
                userID: this.state.user._id,
                newReward: this.state.reward,
                action: 'submitNewRequest',
                newRequest: {
                  type: "Reward",
                  collection: 'rewards',
                  name: this.state.reward.name,
                  summary: this.state.reward.summary,
                  description: "Applied for a Reward - " + this.state.reward.name,
                  date: date,
                  id: date.getTime(),
                  state: "Pending",
                  subject: this.state.reward
                }
            });

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
                confirmation:show
            }
        )
    },
    _affordReward: function() {
        return this.state.user.totalPoints >= this.state.reward.points;
    },
    render: function() {
        return (
            <div className="container reward-detail">
                <div className="row">
                    <div className="content-item col-xs-12 col-sm-6">
                        <h3 className="content-item-title"><i className="fa fa-trophy"></i><span className="spacing"></span>{this.state.reward.name}</h3>
                        <label className="form-label">Description</label>
                        <p>{this.state.reward.description}</p>
                        <label className="form-label">Points</label>
                        <p>{(this.state.reward.points || '').toLocaleString('pt')}</p>
                        <button className="button submit" onClick={this._showConfirmationDialog}>Apply</button>
                        <div>
                            <Link to="/rewards" className="button">Back</Link>
                        </div>
                    </div>
                </div>
                <div id="confirmation" className={this.state.confirmation ? "modal show" : "modal"}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this._hideConfirmationDialog}>&times;</button>
                        <h4 className="modal-title">Confirmation</h4>
                      </div>
                      <div className="modal-body">
                          {this._affordReward()
                          ?   <p>Are you sure you want to apply for this reward? Your request will be revised </p>
                          :   <p>You can't afford this reward!</p>
                          }

                      </div>
                      <div className="modal-footer">
                        <button type="button" className="button" data-dismiss="modal" onClick={this._hideConfirmationDialog}>Close</button>
                        {this._affordReward()
                        ?   <button type="button" className="button submit" onClick={this._requestApplication}>Accept</button>
                        :   null
                        }

                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
});

module.exports = RewardDetail;
