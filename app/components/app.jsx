var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var Index = require('./mainTemplates/index.jsx');
var Home = require('./mainTemplates/home.jsx');
var Goal = require('./goals/goalDetail.jsx');
var Reward = require('./rewards/rewardDetail.jsx');
var Profile = require('./profile/profile.jsx');
var Admin = require('./mainTemplates/admin.jsx');
var AdminMain = require('./admin/main.jsx');
var UsersManagement = require('./admin/users.jsx');
var RewardsManagement = require('./admin/rewards.jsx');
var GoalsManagement = require('./admin/goals.jsx');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={Index} >
                        <IndexRoute component={Home} />
                        <Route path="/goals/:id" component={Goal} />
                        <Route path="/rewards/:id" component={Reward}  />
                        <Route path="/profile" component={Profile} />
                        <Route path="/admin" component={Admin} >
                            <IndexRoute component={AdminMain} />
                            <Route path="/admin/users" component={UsersManagement} />
                            <Route path="/admin/rewards" component={RewardsManagement} />
                            <Route path="/admin/goals" component={GoalsManagement} />
                        </Route>
                    </Route>
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

function hasUserName(nextState, replace) {
    if(window.location.href.indexOf('?user=') !== -1){
        replace({
            pathname:'/login',
            state: {nextPathname: nextState.location.pathname}
        });
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
