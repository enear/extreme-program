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
            newUsers: []
        }
    },

    render: function() {
        return (
            <div className="container-fluid admin-content">
                <div className="row">
                    <div className="col-xs-12">
                        <h3 className="underline">Welcome {this.state.admin.username}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 intro-message">
                        <p>This is the <span className="orange">e.</span>near Extreme Program Admin Area.</p>

                        <p>Here you can manage your <Link className="link" to="/goals">Goals</Link> and <Link className="link" to="/Rewards">Rewards</Link></p>

                        <p>You can also change the uses permissions and their total points <Link className="link" to="/users">Here</Link></p>

                        <p>Reply to their <Link to="/requests" className="link">Requests</Link> so that thei can earn their points or not, in case you reject that request</p>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Home;
