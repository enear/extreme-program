var React = require('react');
var RewardsStore = require('../../stores/RewardsStore');
var RewardsActions = require('../../actions/rewardActions');
var Link = require('react-router').Link;


var RewardDetail = React.createClass({
    getInitialState: function () {
        return {
            reward: RewardsStore.getReward()
        }
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
            reward: RewardsStore.getReward()
        }
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
                            <div>
                                <Link to="/" className="btn btn-default">Back</Link>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = RewardDetail;
