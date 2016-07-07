var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var Index = require('./admin/index.jsx');
var UsersManagement = require('./admin/users/userList.jsx');
var UserDetailManagement = require('./admin/users/userDetail.jsx');

var Admin = React.createClass({
    render: function() {
        return(
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={Index}>
                        <Route path="/users" component={UsersManagement} />
                        <Route path="users/:id" component={UserDetailManagement} />
                    </Route>
                </Router>
            </div>
        );
    }
})

ReactDOM.render(<Admin />, document.getElementById('admin'));
