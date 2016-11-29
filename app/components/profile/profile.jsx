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
        if(this.state.errorMessage !== '') {
          ProfileActions.resetPasswordState();
        }

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
            errorMessage: ProfileStore.getPasswordState(),
            changingPassword: false
        };
    },
    _handleChange: function() {
        return function(e) {
            var state = {};
            state[e.target.name] = e.target.value;
            this.setState(state);
        }.bind(this);
    },
    _validForm: function() {
        this.setState({
          errorMessage: ''
        });

      if(this.state.oldPassword === '' || this.state.newPassword === '' || this.state.confirmPassword === '') {
        this.setState({
          errorMessage: 'Please fill all fields'
        });

        return false;
      }

      if(this.state.newPassword != this.state.confirmPassword) {
        this.setState({
          errorMessage: "Your new password and confirmation don't match!"
        });

        return false;
      }

      return true;

    },
    _handleSubmit: function(e) {
        e.preventDefault();

        if(this._validForm()) {
            ProfileActions.changePassword({
                userID: this.state.user._id,
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
                changingPassword: show
            })
        }
    },
    _resetPasswordForm: function() {
      this.setState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        errorMessage: ''
      });
    },
    _cancelForm: function() {
      (this._togglePasswordChangeForm(false))();
      this._resetPasswordForm();
    },
    render: function() {
        return (
            <div id="user-profile" className="container">
                <div className="row" >
                    <div className="col-xs-12 info-section">
                        <h3 className="profile-title"><i className="fa fa-user"></i><span className="spacing"></span> {this.state.user.username} </h3>
                        <p>You have <span className="points">{(this.state.user.totalPoints || '0').toLocaleString('pt')}</span> points</p>
                        <p>Redeem them  <Link className="link" to="/rewards">here</Link></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        {this.state.errorMessage.length > 0
                          ?   <label className="form-label error">{this.state.errorMessage}</label>
                          :   null
                        }

                        <button id="change-password-button" onClick={this._togglePasswordChangeForm(true)} className={"button submit " + (this.state.changingPassword ? "hidden" : "")}>Change Your Password</button>
                    </div>
                    <form  className={"col-xs-12 change-password " + (this.state.changingPassword ? "show" : "")}  onSubmit={this._handleSubmit} >

                        <label htmlFor="oldPassword" className="form-label">Old Password</label>
                        <input className="form-field"  type="password" id="oldPassword" name="oldPassword" value={this.state.oldPassword} onChange={this._handleChange()} />
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input className="form-field"  type="password" id="newPassword" name="newPassword" value={this.state.newPassword} onChange={this._handleChange()} />
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input className="form-field"  type="password" id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this._handleChange()} />
                        <button type="button" className="button" onClick={this._cancelForm}>Cancel</button>
                        <span className="spacing hidden-xs"></span>
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
                                        <h4><Link to={"/" + (request.type) + "s/" + (request.subject._id)}>{request.name}</Link></h4>
                                        <label className="form-label">Date</label>
                                        <p>{dateFormat(request.date, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
                                        <label className="form-label">Type</label>
                                        <p>{request.type}</p>
                                        <label className="form-label">Summary</label>
                                        <p>{request.summary}</p>
                                        <label className="form-label">State</label>
                                        <p>{request.state}</p>
                                      {request.state === 'Rejected' && request.rejectComment && request.rejectComment != ''
                                      ?   <div>
                                            <label className="form-label">Admin Comment:</label>
                                            <p>{request.rejectComment}</p>
                                          </div>
                                      :   null}
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
                                        <p>{(reward.points || '').toLocaleString('pt')}</p>
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
                                            <h4>{dateFormat(item.date, "dddd, mmmm dS, yyyy, h:MM TT")}</h4>
                                            <label className="form-label">Description</label>
                                            <p>{item.description}</p>

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
