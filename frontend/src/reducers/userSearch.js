import { SET_USER_LIST, USER_QUERY } from '../actions';

const initState = {
  userList = null,
  queriedUser = []
};

const chat = (state = initState, action) => {
  switch(action.type) {
  case SET_USER_LIST: {
    return Object.assign({}, state, {
      userList: action.list.sort()
    });
  }
  case USER_QUERY: {
    if(state.userList === null)
      return state;
    const newQueriedUser = state.userList.filter((username) => {
      return username.includes(action.keyword);
    })
    return Object.assign({}, state, {
      queriedUser: newQueriedUser
    })
  }
  default:
    return state;
  }
};

export default chat;
