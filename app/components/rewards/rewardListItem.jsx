var React = require('react');
var Link = require('react-router').Link;

var Reward = React.createClass( {
    render: function(){
        var link = "/rewards/" + this.props.reward._id;
        
        return(
            <div className="reward col-xs-12 col-sm-4">
                <img  src="/assets/reward.jpg" alt="name" title="name" />
                <h3><Link to={link}>{this.props.reward.name}</Link></h3>
                <p>
                    {this.props.reward.description}
                </p>
                <div className="cost-container">{this.props.reward.points} Points</div>
                <div className="text-center">
                    <Link className="btn btn-default" to={link}>Apply</Link>
                </div>
            </div>
        );
    }
});

module.exports = Reward;
