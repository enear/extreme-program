var React = require('react');
var Reward = require('./rewardListItem.jsx');
var RewardStore = require('../../stores/RewardsStore');
var RewardActions = require('../../actions/rewardActions');

var RewardList = React.createClass({
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
        if(Object.keys(this.state.rewards).length === 0) {
            RewardActions.getRewards('/api/rewards');
        }

        RewardStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
            RewardStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(
            this._getState()
        )
    },
    _getState: function() {
        return {
            rewards: RewardStore.getRewards()
        };
    },
    render: function() {
        return (
            <div id="reward-list" className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h2 className="reward-list-title">Rewards</h2>
                        <p className="reward-list-paragraph">
                            Redeem your points for any of these Rewards. Your request will be revised by an admin in order to accept your Request.
                        </p>
                    </div>
                </div>
                <div className="row">
                    {this.state.rewards.map(function(reward, index) {
                        return (
                            <Reward key={index} reward={reward} />
                        )
                    })}
                </div>
            </div>
        );
    }
});

module.exports = RewardList;
