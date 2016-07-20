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
                    <div className="col-xs-12">
                        <h3 className="underline">Rewards</h3>
                    </div>
                </div>
                <div className="row">

                    { this.state.rewards && this.state.rewards.length > 0
                    ?   (this.state.rewards.map(function(reward, index) {
                        var link = '/rewards/' + reward._id;

                        return (
                            <div key={index} className="reward col-xs-12 col-sm-3 content-item">
                               <h4 className="content-item-title"><i className="fa fa-trophy" aria-hidden="true"></i><span className="spacing"></span>{reward.name}</h4>
                               <Link to={link} className="button edit pull-right">Edit</Link>

                               <label className="form-label">
                                   Summary
                               </label>
                               <p>
                                   {reward.summary}
                               </p>
                               <label className="form-label">
                                   Description
                               </label>
                               <p>
                                   {reward.description}
                               </p>
                               <label className="form-label">
                                   Points
                               </label>
                               <p>
                                   {reward.points} Points
                               </p>
                           </div>
                        )
                    }))
                    :   null
                    }
                </div>
                <Link to="/rewards/new" className="button add"><i className="fa fa-plus" aria-hidden="true"></i> <span className="hidden-xs"><span className="spacing"></span>Add new</span></Link>
            </div>
        )
    }
});

module.exports = RewardsList;
