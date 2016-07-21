var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <ul id="navigation">
                            <li><Link activeClassName="active" to="/goals" ><i className="fa fa-star"></i><span className="hidden-xs"><span className="spacing"></span>Goals</span></Link></li>
                            <li><Link activeClassName="active" to="/rewards"><i className="fa fa-trophy"></i><span className="hidden-xs"><span className="spacing"></span>Rewards</span></Link></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Home;
