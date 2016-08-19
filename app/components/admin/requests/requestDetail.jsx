var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;
var dateFormat = require('dateformat');

var RequestDetail = React.createClass({
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
            request: AdminStore.getRequest(),
            requestStates: AdminStore.getRequestStates(),
            admin: AdminStore.getAdmin(),
            confirmation: false
        };
    },
    _hideConfirmationDialog: function() {
        this._handleConfirmation(false);
    },
    _showConfirmationDialog: function() {
        if(this.state.request.state !== 'Pending') {
            this._handleConfirmation(true);
        }
    },
    _handleConfirmation: function(show) {
        this.setState(
            {
                confirmation: show
            }
        )
    },
    _handleStateChange: function() {
        return function(e) {
            var request = this.state.request;

            request[e.target.name] = e.target.value;

            this.setState({
                request: request
            })
        }.bind(this);
    },
    _updateRequest: function() {
        AdminActions.updateUser({
            request: this.state.request,
            admin: this.state.admin.username,
            url: '/api/users/' + this.state.request.user,
            action: 'changeRequestState'
        });

        this.context.router.push('/requests');
    },
    render: function() {
        return (
            <div className="col-xs-12" id="request-detail">
                <h4><i className="fa fa-exchange"></i><span className="spacing"></span>{this.state.request.name}</h4>
                <label className="form-label">Type</label>
                <p>{this.state.request.type}</p>
                <label className="form-label">Date</label>
                <p>{dateFormat(this.state.request.date, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
                <label className="form-label">Summary</label>
                <p>{this.state.request.summary}</p>
                <label className="form-label">Points</label>
                <p>{this.state.request.points}</p>
                {this.state.request.comment
                ?   <div>
                        <label className="form-label">Comment</label>
                        <p>{this.state.request.comment}</p>
                    </div>
                : null
                }


                <label className="form-label">State</label>
                {this.state.requestStates && this.state.requestStates.length > 0
                ?   <select id="state" className="form-field" onChange={this._handleStateChange()} name="state" value={this.state.request.state}>
                        {this.state.requestStates.map(function(state, index) {
                            return (
                                <option key={index}>{state.state}</option>
                            )
                        })}
                    </select>
                :   null
            }
            <div>
                <button type="button" className={"button" + (this.state.request.state !== 'Pending' ? " submit" : "")} onClick={this._showConfirmationDialog}>Save</button>
            </div>
            <div id="confirmation" className={this.state.confirmation ? "modal show" : "modal"}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this._hideConfirmationDialog}>&times;</button>
                            <h4 className="modal-title">Confirmation</h4>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to set this request state as: <span>{this.state.request.state}</span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="button" data-dismiss="modal" onClick={this._hideConfirmationDialog}>Close</button>
                        <button type="button" className="button submit" onClick={this._updateRequest}>Accept</button>
                    </div>
                </div>
            </div>
        </div>
            </div>
        );
    }
});

module.exports = RequestDetail;
