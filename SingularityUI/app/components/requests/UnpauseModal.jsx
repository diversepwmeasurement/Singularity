import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { UnpauseAndPersistRequest } from '../../actions/api/requests';

import FormModal from '../common/modal/FormModal';

class UnpauseModal extends Component {
  static propTypes = {
    requestId: PropTypes.string.isRequired,
    unpauseRequest: PropTypes.func.isRequired
  };

  show() {
    this.refs.unpauseModal.show();
  }

  render() {
    return (
      <FormModal
        ref="unpauseModal"
        action="Unpause Request"
        onConfirm={(data) => this.props.unpauseRequest(data)}
        buttonStyle="primary"
        formElements={[
          {
            name: 'skipHealthchecks',
            type: FormModal.INPUT_TYPES.BOOLEAN,
            label: 'Skip healthchecks'
          },
          {
            name: 'message',
            type: FormModal.INPUT_TYPES.STRING,
            label: 'Message (optional)'
          }
        ]}>
        <p>Are you sure you want to unpause this request?</p>
        <pre>{this.props.requestId}</pre>
      </FormModal>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  unpauseRequest: (data) => dispatch(UnpauseAndPersistRequest(ownProps.requestId, data)),
});

export default connect(
  null,
  mapDispatchToProps,
  null,
  { withRef: true }
)(UnpauseModal);
