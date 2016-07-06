var React = require('react');
var RewardsStore = require('../../stores/RewardsStore');
var RewardsActions = require('../../actions/rewardActions');
var Link = require('react-router').Link;


var RewardDetail = React.createClass({
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
            RewardsActions.sendReward({
                user: this.state.user,
                newReward: this.state.reward,
                action: 'addReward'
            });

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
                    <div className="col-xs-12 col-sm-6">
                        <img  src="/assets/reward.jpg" alt="name" title="name" />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <h3>{this.state.reward.name}</h3>
                        <p>{this.state.reward.description}</p>
                            <div>
                                {this.state.reward.points}
                            </div>
                            <button className="btn btn-primary" onClick={this._showConfirmationDialog}>Apply</button>
                            <div>
                                <Link to="/" className="btn btn-default">Back</Link>
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
                          ?   <p>Are you sure you want to get this reward? {this.state.reward.points} will be removed from your points balance</p>
                          :   <p>You can't afford this reward!</p>
                          }

                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this._hideConfirmationDialog}>Close</button>
                        {this._affordReward()
                        ?   <button type="button" className="btn btn-primary" onClick={this._requestApplication}>Accept</button>
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
