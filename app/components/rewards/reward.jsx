var React = require('react');

var Reward = React.createClass( {
    render: function(){
        return(
            <div className="reward col-xs-12 col-sm-4">
                <img  src="/assets/reward.jpg" alt="name" title="name" />
                <h3>{this.props.reward.name}</h3>
                <p>
                    {this.props.reward.description}
                </p>
                <div className="costContainer">{this.props.reward.points} Points</div>
                <div className="text-center">
                    <a className="btn btn-default" href="#">Apply</a>
                </div>
            </div>
        );
    }
});

module.exports = Reward;
