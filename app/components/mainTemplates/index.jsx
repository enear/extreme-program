var React = require('react');
var GoalList = require('../goals/goalList.jsx');
var RewardList = require('../rewards/rewardList.jsx');
var NavBar = require('../navBar/navBar.jsx');
var IndexStore = require('../../stores/IndexStore');
var IndexActions = require('../../actions/indexActions');
var indexConstants = require('../../constants/indexConstants');

var Index = React.createClass({
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
        if(Object.keys(this.state.user).length === 0) {
            IndexActions.getUser('/?getuser=true');
        }

        IndexStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        IndexStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(
            this._getState()
        );
    },
    _getState: function() {
        return {
            user: IndexStore.getUser()
        }
    },
    render: function() {
        return (
            <div>
                <NavBar />
                {this.props.children}
            </div>
        );
    }
});

module.exports = Index;
