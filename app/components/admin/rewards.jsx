var React = require('react');
var AdminStore = require('../../stores/AdminStore');
var AdminActions = require('../../actions/adminActions');


RewardsManagement = React.createClass({
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
            users: AdminStore.getUsers(),
            roles: AdminStore.getRoles()
        }
    },
    render: function() {
        console.log(this.state);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Rewards </h1>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = RewardsManagement;
