var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var Homepage = require('./homepage.jsx');
var Goal = require('../goals/goalDetail.jsx');
var Reward = require('../rewards/rewardDetail.jsx');
var NavBar = require('../navBar/navBar.jsx');

var Index = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar />
                <Router history={hashHistory}>
                    <Route path="/" component={Homepage} />
                    <Route path="/goals/:id" component={Goal} />
                    <Route path="/rewards/:id" component={Reward} onEnter={test} />
                </Router>
            </div>
        );
    }
});

function test(nextState, replace) {
    replace({
        pathname:'/goals/5770e304ccd41a402b88c1c8',
        state: {nextPathname: nextState.location.pathname}
    });
}

ReactDOM.render(<Index />, document.getElementById('homepage'));
