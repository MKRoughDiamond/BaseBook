import {
  TOCHAT, START_CHAT, GET_CHAT_ROOM_ID,
  SET_CHAT_LIST, SET_CHAT
} from '../actions';

const initState = {
  desiredChatCount: 0,
  chatOn: false,
  otherUsername: null,
  chatRoomID: null,
  chatList: {}
};
/*
const chatInitState = {
  timestamp: null,
  username: null,
  contents: null
};
*/
const chat = (state = initState, action) => {
  switch(action.type) {
  case TOCHAT:
    return Object.assign({}, state, { chatOn : true });
  case START_CHAT:
    return Object.assign({}, state, { otherUsername : action.username });
  case GET_CHAT_ROOM_ID:
    return Object.assign({}, state, { chatRoomID : action.chatRoomID });
  case SET_CHAT_LIST: {
    console.log('chatList: ', state.chatList);
    let newChatList = state.chatList;
    console.log('chat.js: SET_CHAT_LIST-action.list: ', action.list[0]);
    newChatList[state.desiredChatCount] = action.list[0];
    /*action.list.map((chat) => {
      console.log('set_chat_list id: ',chat);
      const sid = id.toString();
      if(sid in state.chatList)
        newChatList[sid] = state.chatList[sid];
      else
        newChatList[sid] = Object.assign({}, chatInitState);
    });*/
    console.log('newChatList: ', newChatList);
    return Object.assign({}, state, {
      chatList : newChatList,
      desiredChatCount: state.desiredChatCount + 1
    });
  }
  case SET_CHAT: {
    const newChat = {
      author: action.chat.author,
      timeStamp: action.chat.timeStamp,
      contents: action.chat.contents
    };
    let newChatList = Object.assign({}, state.chatList);
    newChatList[action.id] = newChat;
    return Object.assign({}, state, { chatList : newChatList });
  }
  default:
    return state;
  }
};

export default chat;
