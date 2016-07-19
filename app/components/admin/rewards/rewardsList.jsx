var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;

var RewardsList = React.createClass({
    getInitialState: function(){
        return this._getState();
    },
    componentWillMount: function() {
        this.props.checkPermission(this.props.permissions.Admin);

        if(this.state.rewards.length === 0) {
            AdminActions.getRewards('/api/rewards');
        }

        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AdminStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(
            this._getState()
        )
    },
    _getState: function() {
        return {
            rewards: AdminStore.getRewards()
        };
    },
    render: function() {
        return (
            <div className="container-fluid admin-content">
                <div className="row">
                    { this.state.rewards && this.state.rewards.length > 0
                        ?  (this.state.rewards.map(function(reward, index) {
                            var link = '/rewards/' + reward._id;

                            return (
                                <div key={index} className="reward col-xs-12 col-sm-3">
                                   <h3>{reward.name}</h3>
                                   <p>
                                       {reward.summary}
                                   </p>
                                   <div className="cost-container">{reward.points} Points</div>
                                   <div>
                                       <Link to={link} className="btn btn-default">Edit</Link>
                                   </div>

                               </div>
                            )
                        }))
                        :   null
                    }
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Link to="/rewards/new" className="btn btn-default"> Add new</Link>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = RewardsList;
