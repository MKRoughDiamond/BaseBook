import React from 'react';
import {connect} from 'react-redux';
import {getChat} from '../../actions';

class Entry extends React.Component {

  componentDidMount() {
    const chat = this.props.chatList[this.props.chatID];
    if(chat.contents === null)
      this.props.getChat(this.props.chatID);
  }

  render() {
    const chat = this.props.chatList[this.props.chatID];
    if(chat.contents === null)
      return <div/>;
    return (
      <div id="chat-wrapper">
        <div id="chat-title">
          <div id="chat-writer">
            {chat.author}
          </div>
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
    getChat: (id) => dispatch(getChat(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
