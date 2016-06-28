var React = require('react');

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
                  <a className="navbar-brand" href="#">Brand</a>
                </div>

                <div className="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
                    <li><a href="#">Link</a></li>
                  </ul>
                </div>
              </div>
            </nav>
        );
    }
});

module.exports = NavBar;
