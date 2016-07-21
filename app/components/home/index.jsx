var React = require('react');
var GoalList = require('../goals/goalList.jsx');
var RewardList = require('../rewards/rewardList.jsx');
var NavBar = require('../navBar/navBar.jsx');
var IndexStore = require('../../stores/IndexStore');
var IndexActions = require('../../actions/indexActions');
var Link = require('react-router').Link;

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
                <NavBar user={this.state.user} />
                <div id="main-container" className="container-fluid">
                    <div className="row hidden-xs spacing-section">
                        <div className="col-xs-12 ">

                        </div>
                    </div>

                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Index;
