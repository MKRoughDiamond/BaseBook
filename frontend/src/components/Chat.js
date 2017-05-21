import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import Main from './ChatComponents/Main';

class Chat extends React.Component {
  render() {
    return (this.props.isLoggedIn)?(
      (this.props.chatOn)?(
        <Main />
      ):(
        <Redirect to="/" />)
    ):(
      <Redirect to="/login/"/>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isLoggedIn : state.server.loggedIn,
    chatOn : state.chat.chatOn
  };
};

export default connect(mapStateToProps)(Chat);
