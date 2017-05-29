import React from 'react';
import {connect} from 'react-redux';
import {setID, setPW, toSignUp, login} from '../../actions';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdateID = this.handleUpdateID.bind(this);
    this.handleUpdatePW = this.handleUpdatePW.bind(this);
    this.handleToSignUp = this.handleToSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleUpdateID(e) {
    this.props.onUpdateID(e.target.value);
  }

  handleUpdatePW(e) {
    this.props.onUpdatePW(e.target.value);
  }

  handleToSignUp() {
    this.props.toSignUp();
  }

  handleLogin() {
    this.props.login();
  }

  handleKeyPress(e) {
    if(e.key === 'Enter')
      this.handleLogin();
  }

  render() {
    return (<div id="login">
      <div className="line-thick">Welcome to BaseBook!</div>
        <div className="line">
          <div id="username">ID</div>
          <input type="text" id="input-username" onChange={this.handleUpdateID}/>
        </div>
        <div className="line-thick">
          <div id="password">password</div>
          <input type="password" id="input-password"
            onChange={this.handleUpdatePW}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div>
          <button id="SignUp" className="loginButtons" onClick={this.handleToSignUp}>Sign Up</button>
          <button id="SignIn" className="loginButtons" onClick={this.handleLogin}>Sign In</button>
        </div>
      </div>);
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onUpdateID: (value) => dispatch(setID(value)),
    onUpdatePW: (value) => dispatch(setPW(value)),
    toSignUp: () => dispatch(toSignUp()),
    login: () => dispatch(login()),
  };
};

export default connect(null, mapDispatchToProps)(Main);
