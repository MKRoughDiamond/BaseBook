import React from 'react';
import {connect} from 'react-redux';
import {getChatList, startChat, postChat, /*toFeed, */startSound} from '../../actions';
import Entry from './Entry';
import TopBar from '../TopBar';

class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartChat = this.handleStartChat.bind(this);
    this.handlePostChat = this.handlePostChat.bind(this);
//    this.handleToFeed = this.handleToFeed.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleStartChat() {
    const username = document.getElementById('username-textbox').value;
    this.props.startSound('startchat');
    this.props.startChat(username);
  }

  handlePostChat() {
    const contents = document.getElementById('new-chat-text').value;
    document.getElementById('new-chat-text').value = '';
    this.props.postChat(this.props.chatRoomID, contents);
  }
/*
  handleToFeed() {
    this.props.toFeed();
  }
*/
  handleKeyPress(e) {
    if(e.key === 'Enter')
      this.handlePostChat();
  }

  render() {
    const chatList = this.props.chatList;
    return (
      <div id="main-wrapper">
        <TopBar/>
        <div id="main-content" className={'main-content-color'} style={{backgroundColor:this.props.theme}}>
          <div id="chatting-title">
            <div id="username-title">
              Nickname :
            </div>
            <div id="username-textbox-wrapper">
              <input type="input" id="username-textbox" />
            </div>
            <div id="chatting-start-button-wrapper">
              <button id="chatting-start-button" onClick={this.handleStartChat}>
                START
              </button>
            </div>
          </div>
          <div id="chatting-main">
            <div id="chatting-content">
              {chatList.map( (item) => {
                return <Entry index={item.id}/>;
              })}
            </div>
            <div id="new-chat">
              <div id="new-chat-text-wrapper">
                <input id="new-chat-text" onKeyPress={this.handleKeyPress}/>
              </div>
              <button id="new-chat-post" onClick={this.handlePostChat}>
                POST
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    chatRoomID: state.chat.chatRoomID,
    chatList: state.chat.chatList,
    theme: state.server.theme,
    isDefaultTheme: state.server.isDefaultTheme
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getChatList: (chatRoomID) => dispatch(getChatList(chatRoomID)),
    startChat: (username) => dispatch(startChat(username)),
    postChat: (chatRoomID, contents) => dispatch(postChat(chatRoomID, contents)),
 //   toFeed: () => dispatch(toFeed()),
    startSound: (url) => dispatch(startSound(url))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChatMain);
