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
                url: '/api/users/' + user._id,
                action: 'changeRole'
            });

        }.bind(this);
    },
    _handlePointsUpdate: function(e) {
        return function(e) {
            var user = this.state.user,
                points = user.totalPoints - e.target.value;

            user.totalPoints = e.target.value;

            this.setState({
                user: user
            });

            AdminActions.updateUser({
                points: points,
                url: '/api/users/' + user._id,
                action: 'updatePoints'
            });

        }.bind(this);
    },
    render: function() {
        //TODO: This is throwing an warning about un/controlled inputs
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <p>{this.state.user.email}</p>
                        <input type="number" name="totalPoints" onChange={this._handlePointsUpdate()} value={this.state.user.totalPoints} /> <br />

                        <select name="role" onChange={this._handleRoleChange()} value={this.state.user.role} >
                            {   this.state.roles.map(function(role, index) {
                                return (
                                    <option key={index} value={role.role}>{role.role}</option>
                                )
                            })}
                        </select>
                        <h4>User history</h4>
                        {this.state.user.history && this.state.user.history.length > 0
                        ?   (this.state.user.history.map(function(item, index) {
                            return(
                                <div key={index} className="col-xs-12">
                                    <h4>{item.name} - {item.operation}</h4>
                                    <p>{dateFormat(item.date, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
                                </div>
                            )
                        }))
                        : <p>This user has no activity at the moment</p>
                        }
                        <Link to="/users" className="btn btn-default" >Back</Link>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = UserDetail;
