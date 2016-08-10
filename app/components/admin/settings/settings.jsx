var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;

var Settings = React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return this._getState()
  },
  componentWillMount: function() {
    this.props.checkPermission(this.props.permissions.Admin);

    if(Object.keys(this.state.settings).length === 0) {
      AdminActions.getSettings('/api/settings');
    }

    AdminStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    AdminStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(
      this._getState()
    );
  },
  _getState: function() {
    return {
      settings: AdminStore.getSettings()
    }
  },
  _handleChange: function() {
    return function(e) {
      var settings = this.state.settings;

      settings[e.target.name] = e.target.value;

      this.setState({
        settings: settings
      })
    }.bind(this);
  },
  _handleBlur: function() {
    return function(e) {
      var settings = this.state.settings;

      settings[e.target.name] = e.target.value < 0 ? 0 : e.target.value || 0;

      this.setState({
        settings: settings
      })
    }.bind(this);
  },
  _handleSubmit: function(e) {
    e.preventDefault();
    AdminActions.updateSettings(this.state.settings);
    this.context.router.push('/');
  },
  _resetValues: function() {
    AdminActions.getSettings('/api/settings');
    this.context.router.push('/');
  },
  render: function() {
    return (
      <div className="container-fluid admin-content">
        <div className="row">
          <form className="col-xs-12 col-sm-6 content-item-form" onSubmit={this._handleSubmit}>
            <h3><i className="fa fa-wrench" aria-hidden="true"></i><span className="spacing"></span>Settings</h3>
            <label htmlFor="maxUserPoints" className="form-label">
              Maximum points per user
            </label>
            <input className="form-field" id="maxUserPoints" type="number" value={this.state.settings.maxUserPoints} onBlur={this._handleBlur()} onChange={this._handleChange()} name="maxUserPoints" />
            <label htmlFor="maxApprovePoints" className="form-label">
              Maximum points to approve
            </label>
            <input className="form-field" id="maxApprovePoints" type="number" value={this.state.settings.maxApprovePoints} onBlur={this._handleBlur()} onChange={this._handleChange()} name="maxApprovePoints" />
            <div>
              <button type="button" className="button" onClick={this._resetValues}> Cancel</button>
              <input type="submit" className="button submit pull-right" value="Save" />
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Settings;