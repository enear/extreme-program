var React = require('react');
var AdminStore = require('../../stores/AdminStore');
var AdminActions = require('../../actions/adminActions');
var Link = require('react-router').Link;

var Admin = React.createClass({
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
        if(Object.keys(this.state.user).length === 0) {
            AdminActions.getUser('/?getuser=true');
        }

        if(this.state.users.length === 0) {
            AdminActions.getUsers('/api/users');
        }

        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AdminStore.removeChangeListener(this._onChange);
    },
    _getState: function() {
        return {
            user: AdminStore.getUser(),
            users: AdminStore.getUsers()
        }
    },
    _onChange: function() {
        this.setState(
            this._getState()
        );
    },
    render: function(){
        console.log(this.state);
        return (
            <div className="admin">
                <div id="adminNav">
                    <ul className="navigation" >
                        <li><Link to="admin/users">Users</Link></li>
                        <li><Link to="admin/rewards">Rewards</Link></li>
                        <li><Link to="admin/goals">Goals</Link></li>
                    </ul>
                </div>
                {this.props.children}
            </div>

        );
    }
});

module.exports = Admin;
