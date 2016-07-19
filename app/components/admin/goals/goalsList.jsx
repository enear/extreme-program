var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;

var GoalsList = React.createClass({
    getInitialState: function(){
        return this._getState();
    },
    componentWillMount: function() {
        this.props.checkPermission(this.props.permissions.Admin);

        if(this.state.goals.length === 0) {
            AdminActions.getGoals('/api/goals');
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
            goals: AdminStore.getGoals()
        };
    },
    render: function() {
        return (
            <div className="container-fluid admin-content">
                <div className="row">
                    { this.state.goals && this.state.goals.length > 0
                        ?  (this.state.goals.map(function(goal, index) {
                            var link = '/goals/' + goal._id;

                            return (
                                <div key={index} className="goal col-xs-12 col-sm-3">
                                   <h3>{goal.name}</h3>
                                   <p>
                                       {goal.summary}
                                   </p>
                                   <div className="cost-container">{goal.points} Points</div>
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
                        <Link to="/goals/new" className="btn btn-default"> Add new</Link>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = GoalsList;
