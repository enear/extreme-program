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
            goal: {},
            errorMessage: ''
        }
    },
    _handleChange: function() {
        return function(e) {
            var goal = this.state.goal;

            goal[e.target.name] =  e.target.type === 'checkbox' ? e.target.checked :  e.target.value;

            this.setState({
                goal: goal
            })
        }.bind(this);
    },
    _handleSubmit: function(e) {
        e.preventDefault();

        if(this._validForm()) {
            AdminActions.createGoal(this.state.goal);
            this.context.router.push('/goals');
        }
    },
    _validForm: function() {
        this.setState({
            errorMessage: ''
        });

        if(Object.keys(this.state.goal).length < 4 || this.state.goal.name === '' || this.state.goal.summary === '' || this.state.goal.description === '' || this.state.goal.points === '') {
            this.setState({
                errorMessage: 'Please fill all fields!'
            });

            return false;
        }

        return true;

    },
    render: function() {
        return (
            <div className="container-fluid admin-content">
                <div className="row">
                    <form onSubmit={this._handleSubmit} className="col-xs-12 col-sm-6 content-item-form">
                        {this.state.errorMessage !== ''
                          ? <label className="form-label error">{this.state.errorMessage}</label>
                          : null
                        }
                        <label htmlFor="name" className="form-label"><i className="fa fa-star"></i><span className="spacing"></span>Name</label>
                        <input className="form-field" type="text" value={this.state.goal.name} onChange={this._handleChange()} name="name" />
                        <label htmlFor="summary" className="form-label">Summary</label>
                        <textarea className="form-field text-area" id="summary" value={this.state.goal.summary} name="summary" onChange={this._handleChange()}></textarea>
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-field text-area" id="description" value={this.state.goal.description} name="description" onChange={this._handleChange()}></textarea>
                        <label htmlFor="points" className="form-label">Points</label>
                        <input className="form-field" id="points" type="number" value={this.state.goal.points} onChange={this._handleChange()} name="points" />
                        <label htmlFor="published" className="form-label">Published</label>
                        <div className="checkboxContainer">
                            <input id="published" type="checkbox" checked={this.state.goal.published} onChange={this._handleChange()} name="published" />
                        </div>
                        <label htmlFor="pointsOnce" className="form-label">Award points only once</label>
                        <div className="checkboxContainer">
                            <input id="pointsOnce" type="checkbox" checked={this.state.goal.pointsOnce} onChange={this._handleChange()} name="pointsOnce" />
                        </div>

                        <Link to="/goals" className="button">Back</Link>
                        <input type="submit" className="button submit pull-right" value="Save" />
                    </form>
                </div>
            </div>
        )
    }
});

module.exports = NewGoal;
