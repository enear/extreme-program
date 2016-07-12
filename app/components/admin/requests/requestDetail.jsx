var React = require('react');
var AdminStore = require('../../../stores/AdminStore');
var AdminActions = require('../../../actions/adminActions');
var Link = require('react-router').Link;


var RequestDetail = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return this._getState();

    },
    componentWillMount: function() {
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
            request: AdminStore.getRequestById(this.props.params.id),
            requestStates: AdminStore.getRequestStates(),
            confirmation: false
        };
    },
    _hideConfirmationDialog: function() {
        this._handleConfirmation(false);
    },
    _showConfirmationDialog: function() {
        this._handleConfirmation(true);
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
            url: '/api/users/' + this.state.request.user,
            action: 'changeRequestState'
        });

        //this.context.push('/requests');
    },
    render: function() {
        console.log(this.state);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <p>{this.state.request.name}</p>
                        <p>{this.state.request.summary}</p>
                        {this.state.requestStates && this.state.requestStates.length > 0
                        ?   <select onChange={this._handleStateChange()} name="state" value={this.state.request.state}>
                                {this.state.requestStates.map(function(state, index) {
                                    return (
                                        <option key={index}>{state.state}</option>
                                    )
                                })}
                            </select>
                        :   null
                        }
                        <div>
                            <Link className="btn btn-default" to="/requests">Back</Link>
                            <button className="btn btn-primary" onClick={this._showConfirmationDialog}>Save</button>
                        </div>
                    </div>
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
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this._hideConfirmationDialog}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={this._updateRequest}>Accept</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
});

module.exports = RequestDetail;
