var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var Homepage = require('./homepage.jsx');

var Index = React.createClass({
    render: function() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Homepage} />
            </Router>
        );
    }
});

ReactDOM.render(<Index />, document.getElementById('homepage'));
