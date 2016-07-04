var React = require('react');
var ProfileStore = require('../../stores/ProfileStore');
var ProfileActions = require('../../actions/profileActions');


var Profile = React.createClass({
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
        ProfileStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        ProfileStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(
            this._getState()
        );
    },
    _getState: function() {
        return {
            user: ProfileStore.getUser()
        };
    },
    render: function() {
        console.log(this.state);
        return (
            <div className="user-profile container">
                <div className="row" >
                    <div className="col-xs-12">
                        <h1>This is the user profile page</h1>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Profile;
