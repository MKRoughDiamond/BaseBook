import React from 'react';
import {connect} from 'react-redux';
import {startMultiChat} from '../../actions';

class MultiChatRoomEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartMultiChat = this.handleStartMultiChat.bind(this);
  }

  componentDidMount() {
    this.enterTag = null;
    if (this.props.multichatEnterList.indexOf(this.props.id) !== -1)
      this.enterTag = '참석중!';
  }

  handleStartMultiChat() {
    this.props.startMultiChat(this.props.id);
  }

  render() {
    /*console.log('RoomEntry Render');
    console.log('multichatRoomIDList: ', this.props.multichatRoomIDList);
    console.log('this.props.id: ' ,this.props.id);
    const multichatRoom = this.props.multichatRoomList[this.props.id - 1];
    console.log('multichatRoom: ', multichatRoom);*/
    return (
      <div id="multichat-room" onClick={this.handleStartMultiChat}>
        <div id="multichat-room-id">
          { this.props.id }
        </div>
        <div id="multichat-room-enter">
          { this.enterTag }
        </div>
      </div>
    );
  }
}
/*
return (
  <div id="multichat-room" onClick={this.handleStartMultiChat}>
    <div id="multichat-room-id">
      { multichatRoom.id }
    </div>
    <div id="multichat-room-user-list">
      { multichatRoom.users }
    </div>
    <div id="multichat-room-mafia">
      {}
    </div>
  </div>
);*/

let mapStateToProps = (state) => {
  return {
    multichatRoomIDList: state.multichat.multichatRoomIDList,
    multichatRoomList: state.multichat.multichatRoomList,
    multichatEnterList: state.multichat.multichatEnterList
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    startMultiChat: (multichatRoomID) => dispatch(startMultiChat(multichatRoomID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiChatRoomEntry);
