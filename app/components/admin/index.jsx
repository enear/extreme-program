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
                <div id="admin-top-nav">
                    <a href="/logout" className="pull-right logout"><i className="fa fa-sign-out" aria-hidden="true"></i></a>
                </div>
                <div id="admin-side-nav">
                    <div className="user-info text-center">
                        <span className="user"><i className="fa fa-user" aria-hidden="true"></i><span className="spacing"></span>{this.state.admin.email}</span>
                    </div>
                    <ul className="navigation" >
                        {this._hasPermission(this._userPermissions.Attributor)
                        ?   <li><Link activeClassName="active" to="/users"><i className="fa fa-users" aria-hidden="true"></i><span className="spacing"></span>Users</Link></li>
                        :   null
                        }
                        {this._hasPermission(this._userPermissions.Admin)
                        ?   <li><Link activeClassName="active" to="/rewards"><i className="fa fa-trophy" aria-hidden="true"></i><span className="spacing"></span>Rewards</Link></li>
                        :   null
                        }
                        {this._hasPermission(this._userPermissions.Admin)
                        ?   <li><Link activeClassName="active" to="/goals"><i className="fa fa-star" aria-hidden="true"></i><span className="spacing"></span>Goals</Link></li>
                        :   null
                        }

                        <li><Link activeClassName="active" to="/requests"><i className="fa fa-exchange" aria-hidden="true"></i><span className="spacing"></span>Requests {this.state.requests.length > 0 ? <span className="pull-right request-notification">{this.state.requests.length}</span> : ""}</Link></li>
                        <li className="logout"><a href="/logout"><i className="fa fa-sign-out" aria-hidden="true"></i><span className="spacing"></span> Sign Out</a></li>
                    </ul>
                </div>
                <div id="admin-content-container">
                    {this.props.children && React.cloneElement(this.props.children, { permissions: this._userPermissions, checkPermission: this.checkPermission()}) }
                </div>
            </div>

        );
    }
});

module.exports = Admin;
