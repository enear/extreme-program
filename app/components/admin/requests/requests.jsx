var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;

var Requests = React.createClass({
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
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
            users: AdminStore.getUsers(),
            requests: AdminStore.getNewRequests()
        }
    },
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        {this.state.requests.length > 0
                        ?   <ul>
                                {this.state.requests.map(function(request, index){
                                    var link = '/requests/' + request.id;
                                    return (
                                        <li key="index">
                                            <p>{request.user.email}</p>
                                            <p>{request.name}</p>
                                            <p>{request.summary}</p>
                                            <p>{request.state}</p>
                                            <Link className="btn btn-default" to={link}>Edit</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        :   <p>No new Requests!</p>
                        }

                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Requests;
