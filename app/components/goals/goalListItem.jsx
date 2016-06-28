var React = require('react');
var GoalsStore = require('../../stores/GoalsStore');
var GoalsActions = require('../../actions/goalsActions');
var Link = require('react-router').Link;

var GoalListItem = React.createClass( {
    render: function(){
        var link = "/goals/" + this.props.goal._id;
        return (
            <div className="goal col-xs-12 col-sm-4">

                <img  src="/assets/goal.jpg" alt="name" title="name" />
                <h3><Link to={link}>{this.props.goal.name}</Link></h3>
                <p>
                    {this.props.goal.description}
                </p>
                <div className="cost-container">{this.props.goal.points} Points</div>
                <div className="text-center">
                    <Link className="btn btn-default" to={link}>Apply</Link>
                </div>
            </div>
        );
    }
});

module.exports = GoalListItem;
