import { SET_CHAT_LIST, SET_CHAT } from '../actions';

const initState = {
  desiredChatCount: 0,
  chatList: {}
};

const chatInitState = {
  author: null,
  timestamp: null,
  contents: null
};

const chat = (state = initState, action) => {
  switch(action.type) {
  case SET_CHAT_LIST: {
    // copy existing chat to prevent redundant GET requests
    let newChatList = {};
    action.list.map((id) => {
      const sid = id.toString();
      if(sid in state.chatList)
        newChatList[sid] = state.chatList[sid];
      else
        newChatList[sid] = Object.assign({}, chatInitState);
    });
    return Object.assign({}, state, { chatList : newChatList });
  }
  case SET_CHAT: {
    const newChat = {
      author: action.chat.author,
      timestamp: action.chat.timestamp,
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
