import React from 'react';
import {connect} from 'react-redux';
import {getTimelineList, toChat, toFeed} from '../../actions';
import Entry from '../FeedComponents/Entry';

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
            {this.props.timelineUser + '\'s Timeline'}
            <button id="chat-button" onClick={this.handleToChat}>Chat</button>
            {(this.props.timelineUser===this.props.username)?
              (<div></div>
            ):(
              <button id="friend-button">friend</button>)}
          </div>
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
    timelineUser: state.server.timelineUser,
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
