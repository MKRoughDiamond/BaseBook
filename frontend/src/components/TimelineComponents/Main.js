import React from 'react';
import {connect} from 'react-redux';
import {getTimelineList, toChat, toFeed} from '../../actions';
import Entry from '../FeedComponents/Entry';
import Post from '../FeedComponents/Post';

class TimelineMain extends React.Component {
  constructor(props) {
    super(props);
    this.handleToChat = this.handleToChat.bind(this);
    this.handleToFeed = this.handleToFeed.bind(this);
  }
  componentDidMount() {
    this.props.getTimelineList();
  }
  handleToChat() {
    this.props.toChat();
  }

  handleToFeed() {
    this.props.toFeed();
  }

  render() {
    return (
      <div id="main-wrapper">
        <div id="main-title">
          <div id="main-title-name" onClick={this.handleToFeed}>
            BaseBook
          </div>
          <div id="logout">
            logout
          </div>
        </div>
        <div id="main-content">
          <div id="Pagename">
            {this.props.username + '\'s Page'}
            <button id="chat-button" onClick={this.handleToChat}>Chat</button>
          </div>
          <Post/>
          <div id="feed-entries">
            {this.props.feedIdList.map( (id) => {
              return <Entry feedID={id} key={id}/>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    feedIdList: state.feed.orderedFeedIdList,
    username: state.server.ID
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getTimelineList: () => dispatch(getTimelineList()),
    toChat: () => dispatch(toChat()),
    toFeed: () => dispatch(toFeed())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TimelineMain);
