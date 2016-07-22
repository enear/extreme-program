var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;

var Requests = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return this._getState();
    },
    componentWillMount: function() {
        this.props.checkPermission(this.props.permissions.Approver);

        if(this.state.requestStates.length === 0 ) {
            AdminActions.getRequestStates('/api/requeststates');
        }

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
            requests: AdminStore.getNewRequests(),
            requestStates: AdminStore.getRequestStates()
        }
    },
    _setRequest: function(request) {
        return function() {
            AdminActions.setRequest(request);
        }
    },
    render: function() {
        var that = this;
        return (
            <div className="container-fluid admin-content">
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <h3 className="underline">Pending Requests</h3>
                        {this.state.requests.length > 0
                        ?   <ul className="requests-list">
                                {this.state.requests.map(function(request, index){
                                    var link = '/requests/' + request.id;
                                    return (
                                        <li className="requests-list-item" key={index}>
                                            <Link onClick={that._setRequest(request)} activeClassName="active" to={link}>
                                                <p className="request-item-user">{request.userName}</p>
                                                <p className="request-item-name">{request.name}</p>
                                                <p className="request-comment">{request.comment}</p>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        :   <p>No new Requests!</p>
                        }

                    </div>
                    <div className="col-xs-12 col-sm-8">
                        {this.props.children && React.cloneElement(this.props.children, { requestStates: this.state.requestStates, permissions: this.props.permissions, checkPermission: this.props.checkPermission})}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Requests;
