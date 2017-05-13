import { TOCHAT, START_CHAT } from '../actions';

const startChatInitState = {
  chatOn: false,
  chatRoomID: null
};

const startChat = (state = startChatInitState, action) => {
  switch(action.type){
  case TOCHAT:
    return Object.assign({}, state, { chatOn : true });
  case START_CHAT:
    return state;//return Object.assign({}, state, { chatRoomID : action.})
  default:
    return state;
  }
};

export default startChat;