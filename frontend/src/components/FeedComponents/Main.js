import React from 'react';
import {connect} from 'react-redux';
import {getFeedList, toChat, toMultiChat} from '../../actions';
import Entry from './Entry';
import Post from './Post';
import TopBar from '../TopBar';
import ContactForm from '../Image';

class FeedMain extends React.Component {
  constructor(props) {
    super(props);
    this.handleToChat = this.handleToChat.bind(this);
    this.handleToMultiChat = this.handleToMultiChat.bind(this);
  }
  componentDidMount() {
    this.props.getFeedList();
  }
  handleToChat() {
    this.props.toChat();
  }
  handleToMultiChat() {
    this.props.toMultiChat();
  }

  render() {
    console.log('feedIdList: ', this.props.feedIdList);
    return (
      <div id="main-wrapper">
        <TopBar/>
        <div id="main-content" className={'main-content-color'} style={{backgroundColor:this.props.theme}}>
          <div id="Pagename">
            {this.props.nickname + '\'s Page'}
            <button id="multichat-button" onClick={this.handleToMultiChat}>
              MultiChat
            </button>
            <button id="chat-button" onClick={this.handleToChat}>
              Chat
            </button>
          </div>
          <ContactForm/>
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
    theme: state.server.theme,
    isDefaultTheme: state.server.isDefaultTheme,
    nickname: state.server.Nick
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getFeedList: () => dispatch(getFeedList()),
    toChat: () => dispatch(toChat()),
    toMultiChat: () => dispatch(toMultiChat()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(FeedMain);
