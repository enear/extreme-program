var React = require('react');
var Link = require('react-router').Link;

var NavBar = React.createClass({
    render: function() {
        return (
            <nav id="topNavigation" className="navbar navbar-default">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link data-toggle="collapse" data-target="#bs-navbar-collapse-1.in" className="navbar-brand" to="/"><img src="/assets/enear-logo1.png" alt="logo" title="logo" /></Link>
                </div>

                <div className="collapse navbar-collapse pull-right" id="bs-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li className="hidden-xs email">User: {this.props.user.username} | You have <span className="points">{(this.props.user.totalPoints || '0').toLocaleString('pt')}</span> Points | </li>
                    <li><Link data-toggle="collapse" data-target="#bs-navbar-collapse-1.in" activeClassName="active" to="/profile">My Profile</Link></li>
                    <li ><a href="/logout">Log Out</a></li>
                  </ul>
                </div>
              </div>
            </nav>
        );
    }
});

module.exports = NavBar;
