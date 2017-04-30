import { SETID, SETPW, NEWID, NEWPW, RETYPEPW, TOMAIN, TOSIGNUP } from '../actions';
import { combineReducers } from 'redux';

const serverInitialState = {
  ID: '',
  PW: '',
  newID: '',
  newPW: '',
  retypePW: '',
  isLogin: true
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
    return Object.assign({}, state, { isLogin : true });
  case TOSIGNUP:
    return Object.assign({}, state, { isLogin : false });
  default:
    return state;
  }	
};

const extra = (state = { value : 'WIP' }, action) => {
  switch(action.type) {
  default:
    return state;
  }
};

const serverApp = combineReducers({
  server,
  extra
});

export default serverApp;
