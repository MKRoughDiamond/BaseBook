import React from 'react';
import {connect} from 'react-redux';
import {getFeedList, toChat} from '../../actions';
import Entry from './Entry';
import Post from './Post';
import TopBar from '../TopBar';

class FeedMain extends React.Component {
  constructor(props) {
    super(props);
    this.handleToChat = this.handleToChat.bind(this);
  }
  componentDidMount() {
    this.props.getFeedList();
  }
  handleToChat() {
    this.props.toChat();
  }

  render() {
    return (
      <div id="main-wrapper">
        <TopBar/>
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
    getFeedList: () => dispatch(getFeedList()),
    toChat: () => dispatch(toChat())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(FeedMain);
