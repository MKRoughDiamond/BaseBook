import React from 'react';
import {connect} from 'react-redux';
import {loginPageError} from '../../actions';

class ErrorBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
    this.props.onConfirm();
  }

  render() {
    if(this.props.errorMsg === null)
      return <div/>;
    
    return (
      <div id="login-error-box">
        <div id="login-error-msg">{this.props.errorMsg}</div>
        <button id="login-error-confirm" onClick={this.handleConfirm}>Confirm</button>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    errorMsg : state.server.errorMsg
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    onConfirm: () => dispatch(loginPageError(null))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBox);
