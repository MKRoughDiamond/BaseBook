import { SETID, SETPW, NEWID, NEWPW, RETYPEPW, TOMAIN, TOSIGNUP, LOGIN_SUCCESS, LOGIN_PAGE_ERROR } from '../actions';

const serverInitialState = {
  ID: '',
  PW: '',
  hash: null,
  newID: '',
  newPW: '',
  retypePW: '',
  isLogin: true,
  loggedIn: false,
  errorMsg: null
};

const server = (state = serverInitialState, action) => {
  switch(action.type) {
  case SETID:
    return Object.assign({}, state, { ID : action.ID });
  case SETPW:
    return Object.assign({}, state, { PW : action.PW });
  case NEWID:
    return Object.assign({}, state, { newID : action.newID });
  case NEWPW:
    return Object.assign({}, state, { newPW : action.newPW });
  case RETYPEPW:
    return Object.assign({}, state, { retypePW : action.retypePW });
  case TOMAIN:
    return Object.assign({}, state,
      { isLogin : true,
        ID : '',
        PW : '' });
  case TOSIGNUP:
    return Object.assign({}, state, 
      { isLogin : false,
        newID : '',
        newPW : '',
        retypePW : '' });
  case LOGIN_SUCCESS:
    return Object.assign({}, state, { loggedIn : true, hash: action.hash });
  case LOGIN_PAGE_ERROR:
    return Object.assign({}, state, { errorMsg : action.msg });
  default:
    return state;
  }	
};

export default server;
