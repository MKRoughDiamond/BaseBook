import React from 'react';
import {connect} from 'react-redux';
import {getChat} from '../../actions';

class Entry extends React.Component {

  render() {
    const chat = this.props.chatList[this.props.index];
    if(chat.contents === null)
      return <div/>;
    return (
      <div id="chat-wrapper">
        <div id="chat-writer">
          {chat.username}
        </div>
        <div id="chat-timestamp">
          {chat.timestamp}
        </div>
        <div id="chat-content">
          {chat.contents}
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
    getChat: (chatRoomID) => dispatch(getChat(chatRoomID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
