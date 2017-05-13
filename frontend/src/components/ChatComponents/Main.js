import React from 'react';
import {connect} from 'react-redux';
import {getChatList, startChat} from '../../actions';
import Entry from './Entry';

class Main extends React.Component {
  /*constructor(props) {
    super(props);
    this.handleStartChat = this.handleStartChat().bind(this);
  }*/
  componentDidMount() {
    this.props.getChatList();
  }

  handleStartChat() {
    const username = document.getElementById('username-textbox').value;
    this.props.startChat(username);
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
                <textarea id="new-chat-text" rows="1">Uh</textarea>
              </div>
              <button id="new-chat-post">
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
    startChat: (username) => dispatch(startChat(username))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Main);
