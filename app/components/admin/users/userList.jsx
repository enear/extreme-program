var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;


UsersManagement = React.createClass({
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {

        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AdminStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(
            this._getState()
        )
    },
    _getState: function() {
        return {
            admin: AdminStore.getAdmin(),
            users: AdminStore.getUsers(),
            roles: AdminStore.getRoles()
        }
    },
    render: function() {
        var that = this;
        console.log(this.state);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        { this.state.users && this.state.users.length > 0
                        ?    <ul>
                                {this.state.users.map(function(user, index) {
                                    var link = '/users/' + user._id;
                                    return (
                                        <li key={index}>
                                            <p>{user.email}</p>
                                            <p>Points: {user.totalPoints}</p>
                                            <p>{user.role}</p>
                                            <Link to={link} className="btn btn-default">Edit</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        :  null
                        }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = UsersManagement;
