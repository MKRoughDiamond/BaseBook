import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import Main from './ChatComponents/Main';

class Chat extends React.Component {
  render() {
    return (this.props.isLoggedIn)?(
      <Main />
    ):(
      <Redirect to="/login/"/>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isLoggedIn : state.server.loggedIn
  };
};

export default connect(mapStateToProps)(Chat);
