var React = require('react');
var AdminStore = require('../../stores/AdminStore');
var AdminActions = require('../../actions/adminActions');
var Link = require('react-router').Link;

var Home = React.createClass({
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
            users: AdminStore.getUsers(),
            admin: AdminStore.getAdmin(),
            newUsers: AdminStore.getNewUsers()
        }
    },

    render: function() {
        return (
            <div className="container-fluid admin-content">
                <div className="row">
                    <div className="col-xs-12">
                        <h3 className="underline">Welcome {this.state.admin.email}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <h3>
                            Newest Users:
                        </h3>

                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Home;
