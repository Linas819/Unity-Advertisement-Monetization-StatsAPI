import React, { Component } from 'react';
import { Modal, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SetModal } from './ErrorModalAction'

class ErrorModal extends Component { 
  onModalClose = () => {
    this.props.SetModal(false);
  }
  render() {
    return (
      <Modal open={this.props.err.modalState} onClose={this.onModalClose} size='small' style={{textAlign: "center"}}>
        <Header content={this.props.err.errorType} style={{textAlign: "center"}}/>
        <Modal.Content>
          <p>{this.props.err.errorMessage}</p>
        </Modal.Content>
      </Modal>
    );
  }
}

function MapStateToProps(state) {
  return {
      err: state.Err
  };
}

export default withRouter(
  connect(
    MapStateToProps, {SetModal}
  )(ErrorModal));