import React from 'react';
import {connect} from 'react-redux';
import {newid, newpw, retypepw,tomain} from '../../actions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdateID = this.handleUpdateID.bind(this);
    this.handleUpdatePW = this.handleUpdatePW.bind(this);
    this.handleUpdateRetypePW = this.handleUpdateRetypePW.bind(this);
    this.handleToMain = this.handleToMain.bind(this);
  }

  handleUpdateID(e) {
    this.props.onUpdateID(e.target.value);
  }

  handleUpdatePW(e) {
    this.props.onUpdatePW(e.target.value);
  }
	
  handleUpdateRetypePW(e) {
    this.props.onUpdateRetypePW(e.target.value);
  }

  handleToMain() {
    this.props.toMain();
  }

  render() {
    return (<div id="main">
      <div id="line-thick">Sign In</div>
      <div id="line">
        <div id="username">ID</div>
        <input type="text" id="input-username" onChange={this.handleUpdateID}></input>
      </div>
      <div id="line">
        <div id="password">password</div>
        <input type="password" id="input-password" onChange={this.handleUpdatePW}></input>
      </div>
      <div id="line-thick">
        <div id="password">retype PW</div>
        <input type="password" id="input-password" onChange={this.handleUpdateRetypePW}></input>
      </div>
      <div>
        <button id="SignUp" className="loginButtons" onClick={this.handleToMain}>Sign Up</button>
      </div>
    </div>);
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onUpdateID: (value) => dispatch(newid(value)),
    onUpdatePW: (value) => dispatch(newpw(value)),
    onUpdateRetypePW: (value) => dispatch(retypepw(value)),
    toMain: () => dispatch(tomain())
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
