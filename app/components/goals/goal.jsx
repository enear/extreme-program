var React = require('react');
var GoalsStore = require('../../stores/GoalsStore');
var GoalsActions = require('../../actions/goalsActions');

var Goal = React.createClass( {
    getInitialState: function() {
        return {
            goal: this.props.goal || {}
        }
    },
    componentDidMount: function() {
        if(!this.state.goal) {

        }
    },
    render: function(){
        var link = "/goals/" + this.props.goal._id;
        return (
            <div className="goal col-xs-12 col-sm-4">
                <img  src="/assets/goal.jpg" alt="name" title="name" />
                <h3>{this.props.goal.name}</h3>
                <p>
                    {this.props.goal.description}
                </p>
                <div className="costContainer">{this.props.goal.points} Points</div>
                <div className="text-center">
                    <a className="btn btn-default" href={link}>Apply</a>
                </div>
            </div>
        );
    }
});

module.exports = Goal;
