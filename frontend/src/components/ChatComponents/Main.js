import React from 'react';
import {connect} from 'react-redux';
import {getChatList, startChat, postChat} from '../../actions';
import Entry from './Entry';

class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartChat = this.handleStartChat.bind(this);
    this.handlePostChat = this.handlePostChat.bind(this);
  }

  handleStartChat() {
    console.log('Start Chat!');
    const username = document.getElementById('username-textbox').value;
    this.props.startChat(username);
  }

  handlePostChat() {
    console.log('Post Chat!');
    const contents = document.getElementById('new-chat-text').value;
    this.props.postChat(this.props.chatRoomID, contents);
  }

  render() {
    const chatList = this.props.chatList;
    console.log('Object.keys(chatList): ', chatList);
    return (
      <div id="main-wrapper">
        <div id="main-title">
          <div id="main-title-name">
              BaseBook
          </div>
          <div id="logout">
            logout
          </div>
        </div>
        <div id="main-content">
          <div id="chatting-title">
            <div id="username-title">
              Username :
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
                <textarea id="new-chat-text" rows="1" defaultValue="Uh"/>
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
    chatList: state.chat.chatList
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getChatList: (chatRoomID) => dispatch(getChatList(chatRoomID)),
    startChat: (username) => dispatch(startChat(username)),
    postChat: (chatRoomID, contents) => dispatch(postChat(chatRoomID, contents))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChatMain);
