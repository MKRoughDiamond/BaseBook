import React from 'react';
import {connect} from 'react-redux';
import {getChat} from '../../actions';

class Entry extends React.Component {

  render() {
    const chat = this.props.chatList[this.props.index];
    if(chat.contents === null)
      return <div/>;
    return (
      <div className="chat-wrapper">
        <div className="chat-writer">
          {chat.username}
        </div>
        <div className="chat-content">
          {chat.contents}
        </div>
        <div className="chat-timestamp">
          {chat.timestamp}
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
