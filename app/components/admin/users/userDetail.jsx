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
            roles: AdminStore.getRoles(),
            settings: AdminStore.getSettings(),
            pointsWarning: false,
            userPoints: AdminStore.getUser().totalPoints
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
                admin: this.state.admin.username,
                url: '/api/users/' + user._id,
                action: 'changeRole'
            });

        }.bind(this);
    },
    _handlePointsUpdate: function(e) {
        return function(e) {
            this.setState({
            userPoints: parseInt(e.target.value)
            });
        }.bind(this);
    },
    _handleOnBlur: function(e) {
        return function(e) {
            var points = parseInt(e.target.value) || 0;

            if(!this._pointsExceeded(points) && !this.props.isAdmin || this.props.isAdmin) {
                if(points >= 0 && points !== this.state.user.totalPoints) {
                    AdminActions.updateUser({
                        points: points,
                        admin: this.state.admin.username,
                        url: '/api/users/' + this.state.user._id,
                        action: 'updatePoints'
                    });
                }
            }
            else {
                this._showWarning();
            }

        }.bind(this);
    },
    _hideWarningDialog: function() {
        this.setState({
            pointsWarning: false,
            userPoints: this.state.user.totalPoints
        })
    },
    _pointsExceeded: function(points) {
        return Math.abs(this.state.user.totalPoints - points) > this.state.settings.maxApprovePoints;
    },
    _showWarning: function() {
        this.setState( {
            pointsWarning: true
        });
    },
    render: function() {
        return (
                <div className="col-xs-12" id="user-detail">
                    <h4><i className="fa fa-user" aria-hidden="true"></i><span className="spacing"></span>{this.state.user.email}</h4>
                    <label className="form-label">Created:</label>
                    <p>{dateFormat(this.state.user.created, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
                    <label className="form-label" htmlFor="userDetailTotalPoints">Points:</label>
                    <input type="number" name="totalPoints" id="userDetailTotalPoints" className="form-field" onBlur={this._handleOnBlur()} onChange={this._handlePointsUpdate()} value={this.state.userPoints} />
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

                    <div id="confirmation" className={this.state.pointsWarning ? "modal show" : "modal"}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this._hideWarningDialog}>&times;</button>
                                    <h4 className="modal-title">Confirmation</h4>
                                </div>
                                <div className="modal-body">
                                    You are not allowed to change more than {(this.state.settings.maxApprovePoints || '').toLocaleString('pt')} points
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="button" data-dismiss="modal" onClick={this._hideWarningDialog}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
});

module.exports = UserDetail;
