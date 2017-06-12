import React from 'react';
import {connect} from 'react-redux';
import {getMultiChatList, postMultiChat, startSound} from '../../actions';
import Entry from './Entry';
import TopBar from '../TopBar';

class MultiChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.handlePostMultiChat = this.handlePostMultiChat.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    this.props.getMultiChatList(this.props.multichatRoomID);
  }

  handlePostMultiChat() {
    const contents = document.getElementById('new-chat-text').value;
    document.getElementById('new-chat-text').value = '';
    console.log('handle post multichat: ',this.props.multichatRoomID,':', contents);
    this.props.postMultiChat(this.props.multichatRoomID, contents);
  }

  handleKeyPress(e) {
    if(e.key === 'Enter')
      this.handlePostMultiChat();
  }

  render() {
    //console.log('MultichatMain Render');
    //console.log('multichatList: ',this.props.multichatList);
    const multichatList = this.props.multichatList;
    //const multichatRoom = this.props.multichatRoomList[this.props.multichatRoomID];
    //console.log('multichatRoom:' ,multichatRoom);
    return (
      <div id="main-wrapper">
        <TopBar/>
        <div id="main-content">
          <div id="multichat-title">
            <div id="multichat-room-user-list">
              { this.props.multichatRoomID }
            </div>
          </div>
          <div id="chatting-main">
            <div id="chatting-content">
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
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getMultiChatList: (multichatRoomID) => dispatch(getMultiChatList(multichatRoomID)),
    postMultiChat: (multichatRoomID, contents) => dispatch(postMultiChat(multichatRoomID, contents)),
    startSound: (url) => dispatch(startSound(url))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MultiChatMain);