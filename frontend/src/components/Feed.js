import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import FeedMain from './FeedComponents/Main';
import ChatMain from './ChatComponents/Main';

class Feed extends React.Component {
  render() {
    if (this.props.isLoggedIn)
      return (this.props.isChatOn) ? (
        <FeedMain/>
      ):(
        <ChatMain/>
      );

    return (
      <Redirect to="/login/"/>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isLoggedIn : state.server.loggedIn,
    isChatOn : state.server.chatOn
  };
};

export default connect(mapStateToProps)(Feed);
