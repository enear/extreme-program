var React = require('react');
var Link = require('react-router').Link;
var dateFormat = require('dateformat');
var ProfileStore = require('../../stores/ProfileStore');
var ProfileActions = require('../../actions/profileActions');

var Profile = React.createClass({
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
        if(Object.keys(this.state.user).length === 0) {
            ProfileActions.getUser('/?getuser=true');
        }

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
            user: ProfileStore.getUser(),
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            changingPassword: false
        };
    },
    _handleBlur: function() {
        return function(e) {
            var state = {};
            state[e.target.name] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    _validForm: function() {
        return this.state.newPassword === this.state.confirmPassword && this.state.oldPassword !== ''
                && this.state.newPassword !== '' && this.state.confirmPassword !== '';
    },
    _handleSubmit: function(e) {
        e.preventDefault();

        if(this._validForm()) {
            ProfileActions.changePassword({
                user: this.state.user,
                action: "changePassword",
                password: this.state.oldPassword,
                newPassword: this.state.newPassword,
                changingPassword: false
            });
        }
    },
    _togglePasswordChangeForm: function(show) {
        var that = this;
        return function() {
            that.setState({
                changingPassword: true
            })
        }

    },
    render: function() {
        console.log(this.state.changingPassword);

        return (
            <div id="user-profile" className="container">
                <div className="row" >
                    <div className="col-xs-12">
                        <h3 className="profile-title"><i className="fa fa-user"></i><span className="spacing"></span> {this.state.user.email}</h3>
                        <p>You have <span className="points">{this.state.user.totalPoints}</span> points</p>
                        <p>Redeem them  <Link className="link" to="/rewards">here</Link></p>
                        <button id="change-password-button" onClick={this._togglePasswordChangeForm(true)} className={"button submit " + (this.state.changingPassword ? "hidden" : "")}>Change Your Password</button>
                    </div>
                </div>
                <div className="row">
                    <form  className={"col-xs-12 change-password " + (this.state.changingPassword ? "show" : "")}  onSubmit={this._handleSubmit} >
                        <label htmlFor="oldPassword" className="form-label">Old Password</label>
                        <input className="form-field"  type="password" id="oldPassword" name="oldPassword" onBlur={this._handleBlur()} />
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input className="form-field"  type="password" id="newPassword" name="newPassword" onBlur={this._handleBlur()} />
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input className="form-field"  type="password" id="confirmPassword" name="confirmPassword" onBlur={this._handleBlur()} />
                        <input type="submit" className="button submit" value="Submit" />
                    </form>
                </div>
                <div className="row">
                    <h3 className="col-xs-12">My Requests</h3>
                    {this.state.user.requests && this.state.user.requests.length > 0
                    ?   (this.state.user.requests.map(function(request, index) {
                        return (
                            <div key={index} className="col-xs-12">
                                <h4 >{request.name}</h4>
                                <p>{dateFormat(request.date, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
                                <p>{request.summary}</p>
                                <p>{request.comment}</p>
                            </div>
                        )
                    }))
                    :   <p className="col-xs-12">There are no requests at the moment</p>

                    }
                    <h3 className="col-xs-12">My Rewards</h3>
                    {this.state.user.rewards && this.state.user.rewards.length > 0
                    ?   (this.state.user.rewards.map(function(reward, index) {
                            return (
                                <div key={index} className="col-xs-12">
                                    <h4 >{reward.name}</h4>
                                    <p>{reward.date}</p>
                                    <p>{reward.summary}</p>
                                </div>
                            )
                        }))
                    :    <p className="col-xs-12">There are no rewards at the moment</p>
                    }
                    <h3 className="col-xs-12">My history</h3>
                    {this.state.user.history && this.state.user.history.length > 0
                    ?   (this.state.user.history.map(function(item, index) {
                        return(
                            <div key={index} className="col-xs-12">
                                <h4>{item.name} - {item.operation}</h4>
                                <p>{dateFormat(item.date, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
                            </div>
                        )
                    }))
                    : null
                    }
                </div>
            </div>
        );
    }
});

module.exports = Profile;
