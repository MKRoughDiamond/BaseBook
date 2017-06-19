import React from 'react';
import {connect} from 'react-redux';
import {getMultiChat} from '../../actions';

class Entry extends React.Component {

  render() {
    const chat = this.props.multichatList[this.props.index];
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
      <div className={(chat.username === 'system')?
        'chat-wrapper-system' : 'chat-wrapper'}
      >
        <div className="chat-writer" style={{color:(chat.username!=='system')?((this.props.mafiaTheme==='night')?'white':'black'):''}}>
          {chat.username}
        </div>
        <div className="chat-content" style={{color:(chat.username!=='system')?((this.props.mafiaTheme==='night')?'white':'black'):''}}>
          {chat.contents}
        </div>
        <div className="chat-timestamp" style={{color:(chat.username!=='system')?((this.props.mafiaTheme==='night')?'white':'black'):''}}>
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
