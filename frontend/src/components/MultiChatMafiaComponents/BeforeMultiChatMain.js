import React from 'react';
import {connect} from 'react-redux';
import {createMultiChat, getMultiChatRoomList, startSound} from '../../actions';
import MultiChatRoomEntry from './RoomEntry';
import TopBar from '../TopBar';

class BeforeMultiChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateMultiChat = this.handleCreateMultiChat.bind(this);
  }
  componentDidMount() {
    this.props.getMultiChatRoomList();
  }
  handleCreateMultiChat() {
    this.props.createMultiChat();
  }

  render() {
    return (
      <div id="main-wrapper">
        <TopBar/>
        <div id="main-content" className={'main-content-color'} style={{backgroundColor:this.props.theme}}>
          <div id="chatting-title">
            <div id="multichat-list-title"> Multi-Chatting Room List </div>
            <div id="multichat-create-button-wrapper">
              <button id="multichat-create-button" onClick={this.handleCreateMultiChat}>
                CREATE
              </button>
            </div>
          </div>
          <div id="multichatroom-content">
            {this.props.multichatRoomIDList.map( (id) => {
              return <MultiChatRoomEntry id={id}/>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    username: state.server.ID,
    multichatRoomIDList: state.multichat.multichatRoomIDList,
    theme: state.server.theme,
    isDefaultTheme: state.server.isDefaultTheme
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getMultiChatRoomList: () => dispatch(getMultiChatRoomList()),
    createMultiChat: () => dispatch(createMultiChat()),
    startSound: (url) => dispatch(startSound(url))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(BeforeMultiChatMain);
