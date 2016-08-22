var React = require('react');
var Link = require('react-router').Link;

var GoalListItem = React.createClass( {
    render: function(){
        var link = "/goals/" + this.props.goal._id;
        return (
            <div className="content-item goal col-xs-12 col-sm-3">
                <h3 className="content-item-title"><Link to={link}><i className="fa fa-star"></i><span className="spacing"></span>{this.props.goal.name}</Link></h3>
                <label className="form-label">Summary</label>
                <p>
                    {this.props.goal.summary}
                </p>
                <label className="form-label">Points</label>
                <p>{(this.props.goal.points || '').toLocaleString('pt')} Points</p>
                <Link className="button submit" to={link}>Apply</Link>
            </div>
        );
    }
});

module.exports = GoalListItem;
