import React from 'react';
import {connect} from 'react-redux';
import Main from './LoginComponents/Main';
import SignUp from './LoginComponents/SignUp';

class Login extends React.Component {
  render() {
    return (this.props.isLogin)?(
      <div id="main-wrapper">
        <Main />
      </div> ):(
      <div id="main-wrapper">
        <SignUp />
      </div> );
  }
}

let mapStateToProps = (state) => {
  return {
    isLogin : state.server.isLogin
  };
};

export default connect(mapStateToProps)(Login);
