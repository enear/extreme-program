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
        return (
            <div id="user-profile" className="container">
                <div className="row" >
                    <div className="col-xs-12 info-section">
                        <h3 className="profile-title"><i className="fa fa-user"></i><span className="spacing"></span> {this.state.user.username} <span className="profile-title-email">( {this.state.user.email} )</span></h3>
                        <p>You have <span className="points">{this.state.user.totalPoints}</span> points</p>
                        <p>Redeem them  <Link className="link" to="/rewards">here</Link></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <button id="change-password-button" onClick={this._togglePasswordChangeForm(true)} className={"button submit " + (this.state.changingPassword ? "hidden" : "")}>Change Your Password</button>
                    </div>
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
                    <div className="col-xs-12 col-sm-4">
                        <h3 className="profile-item-list-title"><i className="fa fa-exchange"></i><span className="spacing"></span>My Requests</h3>
                        {this.state.user.requests && this.state.user.requests.length > 0
                            ?   <ul className="profile-item-list">
                            {this.state.user.requests.map(function(request, index) {
                                return (
                                    <li key={index} className="profile-item">
                                        <h4><Link to={"/goals/" + (request._id)}></Link> {request.name}</h4>
                                        <label className="form-label">Date</label>
                                        <p>{dateFormat(request.date, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
                                        <label className="form-label">Summary</label>
                                        <p>{request.summary}</p>
                                        <label className="form-label">Comment</label>
                                        <p>{request.comment}</p>
                                    </li>
                                )
                            })}
                        </ul>
                        :   <p>There are no requests at the moment</p>

                }

                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <h3 className="profile-item-list-title"><i className="fa fa-trophy"></i><span className="spacing"></span>My Rewards</h3>
                        {this.state.user.rewards && this.state.user.rewards.length > 0
                        ?   <ul className="profile-item-list">
                            {this.state.user.rewards.map(function(reward, index) {
                                return (
                                    <li key={index} className="profile-item">
                                        <h4 ><Link to={"/rewards/"+ (reward._id)}>{reward.name}</Link></h4>
                                        <label className="form-label">Date</label>
                                        <p>{reward.date}</p>
                                        <label className="form-label">Summary</label>
                                        <p>{reward.summary}</p>
                                        <label className="form-label">Date</label>
                                        <p>{reward.points}</p>
                                    </li>
                                )
                            })}
                        </ul>
                        :    <p>You haven't redeem any rewards yet!</p>
                }

                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <h3 className="profile-item-list-title"><i className="fa fa-th-list" aria-hidden="true"></i><span className="spacing"></span>My history</h3>
                        {this.state.user.history && this.state.user.history.length > 0
                        ?   <ul className="profile-item-list">
                                {this.state.user.history.map(function(item, index) {
                                    return(
                                        <li key={index} className="profile-item">
                                            <h4>{item.operation}</h4>
                                            <label className="form-label">Date</label>
                                            <p>{dateFormat(item.date, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
                                            <label className="form-label">Item</label>
                                            <p>{item.name} {item.operation === 'Request' ? '- state: ' + item.state : ""} </p>
                                        </li>
                                    )
                                })}
                            </ul>
                        : <p>You don't have any activity yet</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Profile;
