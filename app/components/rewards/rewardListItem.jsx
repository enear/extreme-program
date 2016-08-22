var React = require('react');
var Link = require('react-router').Link;

var Reward = React.createClass( {
    render: function(){
        var link = "/rewards/" + this.props.reward._id;

        return(
            <div className="content-item reward col-xs-12 col-sm-3">
                <h3 className="content-item-title"><Link to={link}><i className="fa fa-trophy"></i><span className="spacing"></span>{this.props.reward.name}</Link></h3>
                <label className="form-label">Summary</label>
                <p>
                    {this.props.reward.summary}
                </p>
                <label className="form-label">Points</label>
                <p>{this.props.reward.points.toLocaleString('pt')} Points</p>
                <Link className="button submit" to={link}>Apply</Link>
            </div>
        );
    }
});

module.exports = Reward;
