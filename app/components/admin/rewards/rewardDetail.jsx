var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/AdminActions');
var Link = require('react-router').Link;

var RewardDetail = React.createClass({
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {

        if(Object.keys(this.state.reward).length === 0  || this.state.reward._id !== this.props.params.id) {
            AdminActions.getReward('/api/rewards/' + this.props.params.id);
        }
        AdminStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        AdminStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(
            this._getState()
        )
    },
    _getState: function() {
        return {
            reward: AdminStore.getReward()
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
        AdminActions.updateReward(this.state.reward);
    },
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this._handleSubmit}>
                        <div className="col-xs-12">
                            <input type="test" value={this.state.reward.name} onChange={this._handleChange()} name="name" />
                        </div>
                        <div className="col-xs-12">
                            <textarea value={this.state.reward.summary} name="summary" onChange={this._handleChange()}></textarea>
                        </div>
                        <div className="col-xs-12">
                            <textarea value={this.state.reward.description} name="description" onChange={this._handleChange()}></textarea>
                        </div>
                        <div className="col-xs-12">
                            <input type="number" value={this.state.reward.points} onChange={this._handleChange()} name="points" />
                        </div>
                        <div>
                            <Link to="/rewards" className="btn btn-default">Back</Link>
                            <input type="submit" className="btn btn-primary" value="Save" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});

module.exports = RewardDetail;
