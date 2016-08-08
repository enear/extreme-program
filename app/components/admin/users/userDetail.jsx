var React = require('react');
var dateFormat = require('dateformat');
var Link = require('react-router').Link;
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');

var UserDetail = React.createClass({
    getInitialState: function() {
        //TODO: loader to mask the switch between users??
        return this._getState();
    },
    componentWillMount: function() {
        this.props.checkPermission(this.props.permissions.Attributor);

        if(Object.keys(this.state.user).length === 0  || this.state.user._id !== this.props.params.id) {
            AdminActions.getUser('/api/users/' + this.props.params.id);
        }

        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AdminStore.removeChangeListener(this._onChange);
    },
    _getState: function() {
        return {
            admin: AdminStore.getAdmin(),
            user: AdminStore.getUser(),
            roles: AdminStore.getRoles()
        }
    },
    _onChange: function() {
        this.setState(
            this._getState()
        )
    },
    _handleRoleChange: function(e) {
        return function(e) {
            var user = this.state.user;

            user.role = e.target.value;

            this.setState({
                user: user
            });

            AdminActions.updateUser({
                role: user.role,
                admin: this.state.admin,
                url: '/api/users/' + user._id,
                action: 'changeRole'
            });

        }.bind(this);
    },
    _handlePointsUpdate: function(e) {
        return function(e) {
            var user = this.state.user,
                points = e.target.value ;

            user.totalPoints = points;

            this.setState({
                user: user
            });

        }.bind(this);
    },
    _handleOnBlur: function(e) {
        return function(e) {
            var user = this.state.user,
                points = e.target.value || 0;

            user.totalPoints = points;

            AdminActions.updateUser({
                points: points,
                admin: this.state.admin,
                url: '/api/users/' + user._id,
                action: 'updatePoints'
            });

        }.bind(this);
    },
    render: function() {
        console.log(this.state);
        return (
                <div className="col-xs-12" id="user-detail">
                    <h4><i className="fa fa-user" aria-hidden="true"></i><span className="spacing"></span>{this.state.user.email}</h4>
                    <label className="form-label" htmlFor="userDetailTotalPoints">Points:</label>
                    <input type="number" name="totalPoints" id="userDetailTotalPoints" className="form-field" onBlur={this._handleOnBlur()} onChange={this._handlePointsUpdate()} value={this.state.user.totalPoints} />
                    {this.props.permissions.Admin.indexOf(this.state.admin.role) >= 0
                    ?   <div>
                            <label className="form-label" htmlFor="userDetailRole">Role:</label>
                            <select name="role" id="userDetailRole" className="form-field" onChange={this._handleRoleChange()} value={this.state.user.role} >
                                {   this.state.roles.map(function(role, index) {
                                    return (
                                        <option key={index} value={role.role}>{role.role}</option>
                                    )
                                })}
                            </select>
                        </div>
                    :   null
                    }

                    <h4 className="user-history-title"><i className="fa fa-th-list" aria-hidden="true"></i><span className="spacing"></span>User history</h4>
                    {this.state.user.history && this.state.user.history.length > 0
                    ?   <ul className="user-detail-history">
                            {this.state.user.history.map(function(item, index) {
                                return(
                                    <li className="user-detail-history-item" key={index}>
                                        <h4 className="user-history-item-title">{dateFormat(item.date, "dddd, mmmm dS, yyyy, h:MM TT")}</h4>
                                        <p>{item.description} </p>
                                    </li>
                                )
                            })}
                        </ul>

                    : <p>This user has no activity at the moment</p>
                    }
                </div>
        )
    }
});

module.exports = UserDetail;
