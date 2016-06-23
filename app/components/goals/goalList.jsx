var React = require('react');
var Goal = require('./goal.jsx');

var GoalList = React.createClass({
    render: function() {
        return (
            <div id="goal-list" className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h2 className="goal-list-title">Goals</h2>
                        <p className="goal-list-paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <Goal />
                    <Goal />
                    <Goal />
                </div>
            </div>
        );
    }
});

module.exports = GoalList;
