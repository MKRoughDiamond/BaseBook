import {
  TOMULTICHAT, START_MULTICHAT, GET_MULTICHAT_ROOM_ID,
  SET_MULTICHATROOM_LIST,// SET_MULTICHATROOM,
  SET_MULTICHAT_LIST, SET_MULTICHAT, TOFEED, LOGOUT
} from '../actions';

const initState = {
  desiredMultiChatCount: 0,
  multichatOn: false,
  multichatRoomIDList: [],
  multichatRoomList: [],
  multichatRoomID: null,
  multichatList: [],
  multichatEnterList: [],
  multichatCountList: [],
  mafiaState: 'chat',
};
/*
const multichatRoomInitState = {
  roomID: null,
  users: [],
  isMafiaRoom: false,
};
*/
const multichat = (state = initState, action) => {
  switch(action.type) {
  case TOMULTICHAT:
    return Object.assign({}, state, { multichatOn : true , multichatRoomID : null});
  case TOFEED:
    return initState;
  case LOGOUT:
    return initState;
  case START_MULTICHAT:
    return Object.assign({}, state, { multichatRoomID : action.multichatRoomID });
  case GET_MULTICHAT_ROOM_ID:
    return Object.assign({}, state, { multichatRoomID : action.multichatRoomID });
  case SET_MULTICHATROOM_LIST: {
    return Object.assign({}, state, {
      multichatRoomIDList: action.list,
      multichatEnterList: action.enterList,
      multichatCountList: action.countList
    });
  }
/*
  case SET_MULTICHATROOM_LIST: {
    console.log('multichat.js 1');
    console.log('action.list: ',action.list);
    let newMultiChatRoomList = {};
    action.list.map((id) => {
      console.log('multichat.js 2');
      if(id in state.multichatRoomList)
        newMultiChatRoomList[id] = state.multichatRoomList[id];
      else
        newMultiChatRoomList[id] = Object.assign({}, multichatRoomInitState, {
          roomID: id,
        });
    });
    console.log('multichat.js end');
    return Object.assign({}, state, {
      multichatRoomIDList: action.list,
      multichatRoomList: newMultiChatRoomList
    });
  }

  case SET_MULTICHATROOM: {
    let newRoom = {};
    if(action.id in state.multichatRoomList) {
      newRoom = Object.assign({}, state.multichatRoomList[action.id], {
        roomID: action.room.roomID,
        users: action.room.users,
        isMafiaRoom: action.room.isMafiaRoom
      });
    }
    else {
      newRoom = Object.assign({}, multichatRoomInitState, {
        roomID: action.room.roomID,
        users: action.room.users,
        isMafiaRoom: action.room.isMafiaRoom
      });
    }
    let newMultiChatRoomList = Object.assign({}, state.multichatRoomList);
    newMultiChatRoomList[action.id] = newRoom;
    return Object.assign({}, state, { multichatRoomList : newMultiChatRoomList });
  }
*/

  case SET_MULTICHAT:
  case SET_MULTICHAT_LIST: {
    let newMultiChatList = state.multichatList.slice(0);
    let count = newMultiChatList.length;
    const regex = /T([^.]+)./;
    action.list.map((chat) => {
      const match = regex.exec(chat.timestamp);
      newMultiChatList.push({
        id: count,
        timestamp: match[1],
        username: chat.username,
        contents: chat.contents
      });
      count = count + 1;
    });
    return Object.assign({}, state, {
      multichatList : newMultiChatList,
      desiredMultiChatCount: count
    });
  }
  default:
    return state;
  }
};

export default multichat;
