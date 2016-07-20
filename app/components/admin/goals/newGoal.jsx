var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;

var NewGoal = React.createClass({
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
            goal: {}
        }
    },
    _handleChange: function() {
        return function(e) {
            var goal = this.state.goal;

            goal[e.target.name] = e.target.value;

            this.setState({
                goal: goal
            })
        }.bind(this);
    },
    _handleSubmit: function(e) {
        e.preventDefault();
        AdminActions.createGoal(this.state.goal);
        this.context.router.push('/goals');
    },
    render: function() {
        return (
            <div className="container-fluid admin-content">
                <div className="row">
                    <form onSubmit={this._handleSubmit} className="col-xs-12 col-sm-6 content-item-form">
                        <label htmlFor="name" className="form-label"><i className="fa fa-star"></i><span className="spacing"></span>Name</label>
                        <input className="form-field" type="text" value={this.state.goal.name} onChange={this._handleChange()} name="name" />
                        <label htmlFor="summary" className="form-label">Summary</label>
                        <textarea className="form-field text-area" id="summary" value={this.state.goal.summary} name="summary" onChange={this._handleChange()}></textarea>
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-field text-area" id="description" value={this.state.goal.description} name="description" onChange={this._handleChange()}></textarea>
                        <label htmlFor="points" className="form-label">Points</label>
                        <input className="form-field" id="points" type="number" value={this.state.goal.points} onChange={this._handleChange()} name="points" />
                        <Link to="/goals" className="button">Back</Link>
                        <input type="submit" className="button submit pull-right" value="Save" />
                    </form>
                </div>
            </div>
        )
    }
});

module.exports = NewGoal;
