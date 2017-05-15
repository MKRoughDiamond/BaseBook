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

const chatInitState = {
  timestamp: null,
  username: null,
  contents: null
};

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
    let newChatList = Object.assign({}, state.chatList);
    let count = 0;
    /*console.log('chat.js: SET_CHAT_LIST-action.list: ', action.list[0]);
    newChatList[state.desiredChatCount] = action.list[0];*/
    action.list.map((chat) => {
      console.log('set_chat_list id: ',chat);
      if(count in state.chatList)
        newChatList[count] = state.chatList[count];
      else
        newChatList[count] = Object.assign({}, chatInitState, {
          timestamp: chat.timestamp,
          username: chat.username,
          contents: chat.contents
        });
      count = count + 1;
    });
    console.log('newChatList: ', newChatList);
    return Object.assign({}, state, {
      chatList : newChatList,
      desiredChatCount: count
    });
  }
  case SET_CHAT: {
    let newChatList = Object.assign({}, state.chatList);
    let count = state.desiredChatCount;
    action.list.map((chat) => {
      if(count in state.chatList)
        newChatList[count] = state.chatList[count];
      else
        newChatList[count] = Object.assign({}, chatInitState, {
          timestamp: chat.timestamp,
          username: chat.username,
          contents: chat.contents
        });
      count = count + 1;
    });
    return Object.assign({}, state, { 
      chatList : newChatList,
      desiredChatCount: count
    });
  }
  default:
    return state;
  }
};

export default chat;