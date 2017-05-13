import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import FeedMain from './FeedComponents/Main';
import ChatMain from './ChatComponents/Main';

class Feed extends React.Component {
  render() {
    if (this.props.isLoggedIn)
      return (this.props.isChatOn) ? (
        <ChatMain/>
      ):(
        <FeedMain/>
      );

    return (
      <Redirect to="/login/"/>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isLoggedIn : state.server.loggedIn,
    isChatOn : state.startChat.chatOn
  };
};

export default connect(mapStateToProps)(Feed);
