import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import FeedMain from './FeedComponents/Main';

class Feed extends React.Component {
  render() {
    if (this.props.isLoggedIn)
      return (this.props.isChatOn) ? (
        <Redirect to="/chat/"/>
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
    isChatOn : state.chat.chatOn
  };
};

export default connect(mapStateToProps)(Feed);
