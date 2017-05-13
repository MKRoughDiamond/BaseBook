import { TOCHAT, START_CHAT, SET_CHAT_LIST, SET_CHAT } from '../actions';

const initState = {
  //desiredChatCount: 0,
  chatOn: false,
  otherUsername: null,
  chatList: {}
};

const chatInitState = {
  author: null,
  timeStamp: null,
  contents: null
};

const chat = (state = initState, action) => {
  switch(action.type) {
  case TOCHAT:
    return Object.assign({}, state, { chatOn : true });
  case START_CHAT:
    return Object.assign({}, state, { otherUsername : action.username });
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
