var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var Index = require('./mainTemplates/index.jsx');
var Home = require('./mainTemplates/home.jsx');
var GoalsList = require('./goals/goalList.jsx');
var Goal = require('./goals/goalDetail.jsx');
var RewardsList = require('./rewards/rewardList.jsx');
var Reward = require('./rewards/rewardDetail.jsx');
var Profile = require('./profile/profile.jsx');


var App = React.createClass({
    render: function() {
        return (
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={Index} >
                        <IndexRoute component={Home} />
                        <Route path="/goals" component={GoalsList} />
                        <Route path="/goals/:id" component={Goal} />
                        <Route path="/rewards" component={RewardsList} />
                        <Route path="/rewards/:id" component={Reward}  />
                        <Route path="/profile" component={Profile} />

                    </Route>
                </Router>
            </div>
        );
    }
});


ReactDOM.render(<App />, document.getElementById('app'));
