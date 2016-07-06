var React = require('react');
var Link = require('react-router').Link;

var NavBar = React.createClass({
    render: function() {
        return (
            <nav id="topNavigation" className="navbar navbar-default">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link className="navbar-brand" to="/">Brand</Link>
                </div>

                <div className="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li className="active"><Link to="/profile">My Profile</Link></li>
                    {this.props.user.role === 'Admin'
                    ?   <li><Link to="/admin">Admin</Link></li>
                    :   null
                    }
                    <li ><a href="/logout">Log Out</a></li>
                  </ul>
                </div>
              </div>
            </nav>
        );
    }
});

module.exports = NavBar;
