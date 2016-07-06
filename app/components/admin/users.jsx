var React = require('react');
var AdminStore = require('../../stores/AdminStore');
var AdminActions = require('../../actions/adminActions');


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
            user: AdminStore.getUser(),
            users: AdminStore.getUsers()
        }
    },
    render: function() {
        console.log(this.state);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        { this.state.users && this.state.users.length > 0
                        ?    <ul>
                                {this.state.users.map(function(user, index) {
                                    return (
                                        <li key={index}>
                                            <p>{user.email}</p>
                                            <p>{user.totalPoints}</p>
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
