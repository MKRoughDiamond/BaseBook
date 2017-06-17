import React from 'react';
import {connect} from 'react-redux';
import {getMultiChat} from '../../actions';

class Entry extends React.Component {

  render() {
    const chat = this.props.multichatList[this.props.index];
    if(chat.contents === null)
      return <div/>;

    return (
      <div className={(chat.username === 'system')?
        'chat-wrapper-system' : 'chat-wrapper'}
      >
        <div className="chat-writer">
          {chat.username}
        </div>
        <div className="chat-timestamp">
          {chat.timestamp}
        </div>
        <div className="chat-content">
          {chat.contents}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    multichatList: state.multichat.multichatList
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getMultiChat: (multichatRoomID) => dispatch(getMultiChat(multichatRoomID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
