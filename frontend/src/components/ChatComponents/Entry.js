import React from 'react';
import {connect} from 'react-redux';
import {getChat} from '../../actions';

class Entry extends React.Component {

  render() {
    const chat = this.props.chatList[this.props.index];
    if(chat.contents === null)
      return <div/>;
    let timestamp = chat.timestamp;
    console.log('timestamp: ',timestamp);
    console.log(typeof(timestamp));
    let hour = timestamp.substring(0,2);
    console.log('hour: ', hour);
    hour = Number(hour);
    hour += 9;
    hour %= 24;
    timestamp = String(hour) + timestamp.substring(2);
    return (
      <div className="chat-wrapper">
        <div className="chat-writer">
          {chat.username}
        </div>
        <div className="chat-content">
          {chat.contents}
        </div>
        <div className="chat-timestamp">
          {timestamp}
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
