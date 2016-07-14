var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/AdminActions');
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
            <div className="container">
                <div className="row">
                    <form onSubmit={this._handleSubmit}>
                        <div className="col-xs-12">
                            <input type="test" value={this.state.goal.name} onChange={this._handleChange()} name="name" />
                        </div>
                        <div className="col-xs-12">
                            <textarea value={this.state.goal.summary} name="summary" onChange={this._handleChange()}></textarea>
                        </div>
                        <div className="col-xs-12">
                            <textarea value={this.state.goal.description} name="description" onChange={this._handleChange()}></textarea>
                        </div>
                        <div className="col-xs-12">
                            <input type="number" value={this.state.goal.points} onChange={this._handleChange()} name="points" />
                        </div>
                        <div>
                            <Link to="/goals" className="btn btn-default">Back</Link>
                            <input type="submit" className="btn btn-primary" value="Save" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});

module.exports = NewGoal;
