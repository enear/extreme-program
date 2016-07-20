var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;

var NewReward = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
        this.props.checkPermission(this.props.permissions.Admin);
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
            reward: {}
        }
    },
    _handleChange: function() {
        return function(e) {
            var reward = this.state.reward;

            reward[e.target.name] = e.target.value;

            this.setState({
                reward: reward
            })
        }.bind(this);
    },
    _handleSubmit: function(e) {
        e.preventDefault();
        AdminActions.createReward(this.state.reward);
        this.context.router.push('/rewards');
    },
    render: function() {
        return (
            <div className="container-fluid admin-content">
                <div className="row">
                    <form onSubmit={this._handleSubmit} className="col-xs-12 col-sm-6 content-item-form">
                        <label htmlFor="name" className="form-label"><i className="fa fa-trophy" aria-hidden="true"></i><span className="spacing"></span>Name</label>
                        <input id="name" className="form-field" type="text" value={this.state.reward.name} onChange={this._handleChange()} name="name" />
                        <label htmlFor="summary" className="form-label">
                            Summary
                        </label>
                        <textarea id="summary"  className="form-field text-area" value={this.state.reward.summary} name="summary" onChange={this._handleChange()}></textarea>
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea id="description" className="form-field text-area" value={this.state.reward.description} name="description" onChange={this._handleChange()}></textarea>
                        <label htmlFor="points" className="form-label">
                            Points
                        </label>
                        <input id="points" className="form-field" type="number" value={this.state.reward.points} onChange={this._handleChange()} name="points" />
                        <Link to="/rewards" className="button">Back</Link>
                        <input type="submit" className="button submit pull-right" value="Save" />
                    </form>
                </div>
            </div>
        )
    }
});

module.exports = NewReward;
