var React = require('react');
var AdminStore = require('../../stores/AdminStore');
var AdminActions = require('../../actions/adminActions');
var Link = require('react-router').Link;

var Admin = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
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
    userPermissions: function() {

    },
    _getState: function() {
        return {
            admin: AdminStore.getAdmin(),
            users: AdminStore.getUsers(),
            roles: AdminStore.getRoles(),
            requests: AdminStore.getNewRequests()
        }
    },
    _onChange: function() {
        this.setState(
            this._getState()
        );
    },
    _userPermissions: {
        Admin: ['Admin'],
        Attributor: ['Admin', 'Attributor']
    },
    _hasPermission: function(roles) {
        return roles.indexOf(this.state.admin.role) >= 0
    },
    checkPermission: function() {
        return function(permission) {
            if( permission.indexOf(this.state.admin.role) < 0)  {
                this.context.router.push('/');
            }
        }.bind(this);
    },
    render: function(){
        return (
            <div className="admin">
                <div id="adminNav">
                    <ul className="navigation" >
                        {this._hasPermission(this._userPermissions.Attributor)
                        ?   <li><Link to="/users">Users</Link></li>
                        :   null
                        }
                        {this._hasPermission(this._userPermissions.Admin)
                        ?   <li><Link to="/rewards">Rewards</Link></li>
                        :   null
                        }
                        {this._hasPermission(this._userPermissions.Admin)
                        ?   <li><Link to="/goals">Goals</Link></li>
                        :   null
                        }

                        <li><Link to="/requests">Requests {this.state.requests.length > 0 ? <span>this.state.requests.length</span> : ""}</Link></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </div>
                {this.props.children && React.cloneElement(this.props.children, { permissions: this._userPermissions, checkPermission: this.checkPermission()}) }
            </div>

        );
    }
});

module.exports = Admin;
