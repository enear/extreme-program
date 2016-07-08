var React = require('react');
var AdminStore = require('../../stores/AdminStore');
var AdminActions = require('../../actions/adminActions');
var Link = require('react-router').Link;

var Admin = React.createClass({
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
        if(Object.keys(this.state.admin).length === 0) {
            AdminActions.getAdmin('/?getuser=true');
        }

        if(this.state.users.length === 0) {
            AdminActions.getUsers('/api/users');
        }

        if(this.state.roles.length === 0) {
            AdminActions.getRoles('/api/roles');
        }

        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AdminStore.removeChangeListener(this._onChange);
    },
    _getState: function() {
        return {
            admin: AdminStore.getAdmin(),
            users: AdminStore.getUsers(),
            roles: AdminStore.getRoles()
        }
    },
    _onChange: function() {
        this.setState(
            this._getState()
        );
    },
    render: function(){
        return (
            <div className="admin">
                <div id="adminNav">
                    <ul className="navigation" >
                        <li><Link to="/users">Users</Link></li>
                        <li><Link to="/rewards">Rewards</Link></li>
                        <li><Link to="/goals">Goals</Link></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </div>
                {this.props.children}
            </div>

        );
    }
});

module.exports = Admin;
