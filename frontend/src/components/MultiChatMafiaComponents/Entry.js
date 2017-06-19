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
        <div className="chat-writer" style={{color:(chat.username!=='system')?((this.props.mafiaTheme==='night')?'white':'black'):''}}>
          {chat.username}
        </div>
        <div className="chat-content" style={{color:(chat.username!=='system')?(((this.props.mafiaTheme==='night')?'white':'black'):''}}>
          {chat.contents}
        </div>
        <div className="chat-timestamp" style={{color:(this.props.mafiaTheme==='night')?'white':'black'}}>
          {chat.timestamp}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    multichatList: state.multichat.multichatList,
    mafiaTheme: state.multichat.mafiaTheme
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getMultiChat: (multichatRoomID) => dispatch(getMultiChat(multichatRoomID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
