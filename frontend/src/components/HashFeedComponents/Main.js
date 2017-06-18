import React from 'react';
import {connect} from 'react-redux';
import {getHashFeedList, toChat, toFeed} from '../../actions';
import Entry from '../FeedComponents/Entry';
import TopBar from '../TopBar';

class HashFeedMain extends React.Component {
  constructor(props) {
    super(props);
    this.handleToChat = this.handleToChat.bind(this);
    this.handleToFeed = this.handleToFeed.bind(this);
    this.prevTagname = this.props.tagname;
  }
  componentDidMount() {
    this.props.getHashFeedList();
  }
  handleToChat() {
    this.props.toChat();
  }

  handleToFeed() {
    this.props.toFeed();
  }

  render() {
    if(this.prevTagname !== this.props.tagname)
      this.props.getHashFeedList();
    this.prevTagname = this.props.tagname;
    return (
      <div id="main-wrapper">
        <TopBar/>
        <div id="main-content" className={'main-content-color'} style={{backgroundColor:this.props.theme}}>
          <div id="Pagename">
            {'HashTag search: ' + this.props.tagname}
            <button id="chat-button" onClick={this.handleToChat}>Chat</button>
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
    tagname: state.server.tagname,
    theme: state.server.theme,
    isDefaultTheme: state.server.isDefaultTheme
//    username: state.server.ID
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getHashFeedList: () => dispatch(getHashFeedList()),
    toChat: () => dispatch(toChat()),
    toFeed: () => dispatch(toFeed())

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HashFeedMain);
