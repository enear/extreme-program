var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var Index = require('./admin/index.jsx');
var UsersManagement = require('./admin/users/userList.jsx');
var UserDetailManagement = require('./admin/users/userDetail.jsx');
var RewardsManagement = require('./admin/rewards/rewardsList.jsx');
var RewardDetailManagement = require('./admin/rewards/rewardDetail.jsx');
var NewReward = require('./admin/rewards/newReward.jsx');
var GoalsManagement = require('./admin/goals/goalsList.jsx');
var GoalDetailManagement = require('./admin/goals/goalDetail.jsx');
var NewGoal = require('./admin/goals/newGoal.jsx');
var Requests = require('./admin/requests/requests.jsx');
var RequestDetail = require('./admin/requests/requestDetail.jsx');
var AdminStore = require('../stores/AdminStore');
var AdminActions = require('../actions/adminActions');


var Admin = React.createClass({

    render: function() {
        return(
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={Index}>
                        <Route path="/users" component={UsersManagement} >
                            <Route path="/users/:id" component={UserDetailManagement} />
                        </Route>
                        <Route path="/rewards" component={RewardsManagement} />
                        <Route path="/rewards/new" component={NewReward} />
                        <Route path="/rewards/:id" component={RewardDetailManagement} />
                        <Route path="/goals" component={GoalsManagement} />
                        <Route path="/goals/new" component={NewGoal}  />
                        <Route path="/goals/:id" component={GoalDetailManagement} />
                        <Route path="/requests" component={Requests}  />
                        <Route path="/requests/:id" component={RequestDetail} />
                    </Route>
                </Router>
            </div>
        );
    }
})

ReactDOM.render(<Admin />, document.getElementById('admin'));
