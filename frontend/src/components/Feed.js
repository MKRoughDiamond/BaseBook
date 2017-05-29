import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import FeedMain from './FeedComponents/Main';

class Feed extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      if (this.props.onTimeline) {
        const timelineUrl = '/timeline/'+this.props.timelineUser+'/';
        return (
          <Redirect to={timelineUrl}/>
        );
      }
      if (this.props.onHashFeed) {
        const hashtagUrl = '/hashtag/' + this.props.tagname + '/';
        return (
          <Redirect to={hashtagUrl}/>
        );
      }
      return (this.props.isChatOn) ? (
        <Redirect to="/chat/"/>
      ):(
        <FeedMain/>
      );
    }

    return (
      <Redirect to="/login/"/>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isLoggedIn : state.server.loggedIn,
    isChatOn : state.chat.chatOn,
    onTimeline : state.server.onTimeline,
    timelineUser : state.server.timelineUser,
    onHashFeed : state.server.onHashFeed,
    tagname: state.server.tagname
  };
};

export default connect(mapStateToProps)(Feed);
