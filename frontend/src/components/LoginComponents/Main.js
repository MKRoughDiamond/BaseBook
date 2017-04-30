import React from 'react';
import {connect} from 'react-redux';
import {setid, setpw, tosignup} from '../../actions';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdateID = this.handleUpdateID.bind(this);
    this.handleUpdatePW = this.handleUpdatePW.bind(this);
    this.handleToSignUp = this.handleToSignUp.bind(this);
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

  render() {
    return (<div id="main">
      <div id="line-thick">Welcome to BaseBook!</div>
        <div id="line">
          <div id="username">ID</div>
          <input type="text" id="input-username" onChange={this.handleUpdateID}></input>
        </div>
        <div id="line-thick">
          <div id="password">password</div>
          <input type="password" id="input-password" onChange={this.handleUpdatePW}></input>
        </div>
        <div>
          <button id="SignUp" className="loginButtons" onClick={this.handleToSignUp}>Sign Up</button>
          <button id="SignIn" className="loginButtons">Sign In</button>
        </div>
      </div>);
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onUpdateID: (value) => dispatch(setid(value)),
    onUpdatePW: (value) => dispatch(setpw(value)),
    toSignUp: () => dispatch(tosignup()),
  };
};

export default connect(null, mapDispatchToProps)(Main);
