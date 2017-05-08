import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import Main from './LoginComponents/Main';
import SignUp from './LoginComponents/SignUp';
import ErrorBox from './LoginComponents/ErrorBox';

class Login extends React.Component {
  render() {
    if(this.props.isLoggedIn)
      return (
        <Redirect to="/"/>
      );
    
    return (this.props.isLogin)?(
      <div id="login-wrapper">
        <Main />
        <ErrorBox />
      </div> ):(
      <div id="login-wrapper">
        <SignUp />
        <ErrorBox />
      </div> );
  }
}

let mapStateToProps = (state) => {
  return {
    isLogin : state.server.isLogin,
    isLoggedIn : state.server.loggedIn
  };
};

export default connect(mapStateToProps)(Login);
