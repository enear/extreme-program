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
                    <div className="col-xs-12">
                        <h3 className="underline">Goals</h3>
                    </div>
                    { this.state.goals && this.state.goals.length > 0
                        ?  (this.state.goals.map(function(goal, index) {
                            var link = '/goals/' + goal._id;

                            return (
                                <div key={index} className="goal col-xs-12 col-sm-3 content-item">
                                   <h4 className="content-item-title"><i className={"fa fa-star " + (goal.published ? "orange" : "")} aria-hidden="true"></i><span className="spacing"></span>{goal.name}</h4>
                                   <Link to={link} className="button edit pull-right">Edit</Link>
                                       <label className="form-label">
                                           Summary
                                       </label>
                                   <p>
                                       {goal.summary}
                                   </p>
                                   <label className="form-label">
                                       Description
                                   </label>
                                   <p>
                                       {goal.description}
                                   </p>
                                   <label className="form-label">
                                       Points
                                   </label>
                                   <p>
                                       {goal.points} Points
                                   </p>

                               </div>
                            )
                        }))
                        :   null
                    }
                </div>
                <Link to="/goals/new" className="button add"><i className="fa fa-plus" aria-hidden="true"></i> <span className="hidden-xs"><span className="spacing"></span>Add new</span></Link>
            </div>
        )
    }
});

module.exports = GoalsList;
