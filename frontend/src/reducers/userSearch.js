import { SET_USER_LIST, USER_QUERY, LOGOUT } from '../actions';

const initState = {
  userList: null,
  queriedUser: []
};

const userSearch = (state = initState, action) => {
  switch(action.type) {
  case LOGOUT:
    return initState;
  case SET_USER_LIST: {
    return Object.assign({}, state, {
      userList: action.list.sort()
    });
  }
  case USER_QUERY: {
    const MAX_SHOWING_USER = 5;
    if(state.userList === null)
      return state;
    if(action.keyword === '')
      return Object.assign({}, state, {
        queriedUser: []
      });
    // make startsWith() matches appear first
    const startswith = state.userList.filter((username) => {
      return username.startsWith(action.keyword);
    });
    const includes = state.userList.filter((username) => {
      return (username.includes(action.keyword) &&
        !username.startsWith(action.keyword));
    });
    const newQueriedUser = (startswith.concat(includes)).slice(0, MAX_SHOWING_USER);
    return Object.assign({}, state, {
      queriedUser: newQueriedUser
    });
  }
  default:
    return state;
  }
};

export default userSearch;
