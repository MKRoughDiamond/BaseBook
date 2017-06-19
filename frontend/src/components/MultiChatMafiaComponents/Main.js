import React from 'react';
import {connect} from 'react-redux';
import {getMultiChatList, postMultiChat, startSound, mafiaGeneral, mafiaTarget} from '../../actions';
import Entry from './Entry';
import TopBar from '../TopBar';

class MultiChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.handlePostMultiChat = this.handlePostMultiChat.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.beingScrolled = false;
    this.lastTick = false;
  }
  
  componentDidMount() {
    this.props.getMultiChatList(this.props.multichatRoomID);
  }

  componentDidUpdate() {
    if(!this.beingScrolled) {
      this.lastTick = true;
      document.getElementById('chatting-content').scrollTop = 1000000;
    }
  }
  
  handlePostMultiChat() {
    const contents = document.getElementById('new-chat-text').value;
    document.getElementById('new-chat-text').value = '';
    if(contents.startsWith('/게임시작') || contents.startsWith('/start')) {
      this.props.mafiaGeneral(this.props.multichatRoomID, 'start');
    }
    else if(contents.startsWith('/조기투표') || contents.startsWith('/earlyvote')) {
      this.props.mafiaGeneral(this.props.multichatRoomID, 'earlyvote');
    }
    else if(contents.startsWith('/끝내기') || contents.startsWith('/end')) {
      this.props.mafiaGeneral(this.props.multichatRoomID, 'end');
    }
    else {
      const matches = contents.match(/^\/([^\s]+)/i);
      if(matches !== null) {
        this.props.mafiaTarget(this.props.multichatRoomID, matches[1]);
      }
      else {
        this.props.postMultiChat(this.props.multichatRoomID, contents);
      }
    }
  }

  handleKeyPress(e) {
    if(e.key === 'Enter')
      this.handlePostMultiChat();
  }

  handleScroll() {
    if(!this.lastTick)
      this.beingScrolled = true;
    this.lastTick = false;
  }

  handleMouseUp() {
    this.beingScrolled = false;
    this.lastTick = true;
  }

  render() {
    const multichatList = this.props.multichatList;
    return (
      <div id="main-wrapper">
        <TopBar/>
        <div id="main-content" className="main-content-color" style={{backgroundColor:this.props.theme}} onClick={this.handleMouseUp}>
          <div id="multichat-title">
            <div id="multichat-room-user-list">
              { 'Chatting Room '+this.props.multichatRoomID }
            </div>
          </div>
          <div id="chatting-main">
            <div id="chatting-content" onScroll={this.handleScroll} onMouseUp={this.handleMouseUp}>
              {multichatList.map( (item) => {
                return <Entry index={item.id}/>;
              })}
            </div>
            <div id="new-chat">
              <div id="new-chat-text-wrapper">
                <input id="new-chat-text" onKeyPress={this.handleKeyPress}/>
              </div>
              <button id="new-chat-post" onClick={this.handlePostMultiChat}>
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
    multichatRoomID: state.multichat.multichatRoomID,
    multichatList: state.multichat.multichatList,
    theme: state.server.theme
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getMultiChatList: (multichatRoomID) => dispatch(getMultiChatList(multichatRoomID)),
    postMultiChat: (multichatRoomID, contents) => dispatch(postMultiChat(multichatRoomID, contents)),
    startSound: (url) => dispatch(startSound(url)),
    mafiaGeneral: (multichatRoomID, suburl) => dispatch(mafiaGeneral(multichatRoomID, suburl)),
    mafiaTarget: (multichatRoomID, target) => dispatch(mafiaTarget(multichatRoomID, target))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MultiChatMain);
