var React = require('react');

var Goal = React.createClass( {
    render: function(){
        return(
            <div className="goal col-xs-12 col-sm-4">
                <img  src="/assets/goal.jpg" alt="name" title="name" />
                <h3>{this.props.goal.name}</h3>
                <p>
                    {this.props.goal.description}
                </p>
                <div className="costContainer">{this.props.goal.points} Points</div>
                <div className="text-center">
                    <a className="btn btn-default" href="#">Apply</a>
                </div>
            </div>
        );
    }
});

module.exports = Goal;
