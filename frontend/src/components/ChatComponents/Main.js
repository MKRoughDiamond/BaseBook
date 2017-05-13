import React from 'react';
import {connect} from 'react-redux';
import {getChatList, startChat, setChat} from '../../actions';
import Entry from './Entry';

class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartChat = this.handleStartChat.bind(this);
    this.handlePostChat = this.handlePostChat.bind(this);
  }
  componentDidMount() {
    this.props.getChatList();
  }

  handleStartChat() {
    console.log('Start Chat!');
    const username = document.getElementById('username-textbox').value;
    this.props.startChat(username);
  }

  handlePostChat() {
    console.log('Post Chat!');
    const contents = document.getElementById('new-chat-text').value;
    this.props.setChat(contents);
  }

  render() {
    const chatList = this.props.chatList;
    console.log(Object.keys(chatList));
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
              {Object.keys(chatList).map( (id, i) => {
                return <Entry chatID={id} index={i}/>;
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
    chatList: state.chat.chatList
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getChatList: () => dispatch(getChatList()),
    startChat: (username) => dispatch(startChat(username)),
    setChat: () => dispatch(setChat())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChatMain);
