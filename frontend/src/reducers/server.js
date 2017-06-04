import { SETID, SETPW, NEWID, NEWPW, RETYPEPW,
  TOMAIN, TOSIGNUP, LOGIN_SUCCESS, LOGIN_PAGE_ERROR, TOTIMELINE, TOFEED, LOGOUT, TOHASHFEED, START_SOUND, END_SOUND
} from '../actions';

const serverInitialState = {
  ID: '',
  PW: '',
  hash: null,
  newID: '',
  newPW: '',
  retypePW: '',
  isLogin: true,
  loggedIn: false,
  errorMsg: null,
  onTimeline: false,
  timelineUser: null,
  onHashFeed: false,
  tagname: '',
  soundUrl : null,
  soundStart : false
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
  case TOFEED:
    return Object.assign({}, state, {
      onTimeline: false,
      onHashFeed: false,
    });
  case TOMAIN:
    return Object.assign({}, state,
      { isLogin : true,
        ID : '',
        PW : '',
        onTimeline: false,
        onHashFeed: false,});
  case TOSIGNUP:
    return Object.assign({}, state,
      { isLogin : false,
        newID : '',
        newPW : '',
        retypePW : '',
        onTimeline: false,
        onHashFeed: false,});
  case TOTIMELINE:
    return Object.assign({}, state,
      { onTimeline : true,
        onHashFeed : false,
        timelineUser : action.username });
  case TOHASHFEED:
    return Object.assign({}, state,
      { onTimeline : false,
        onHashFeed : true,
        tagname : action.tagname});
  case LOGIN_SUCCESS:
    return Object.assign({}, state, { loggedIn : true, hash: action.hash, onTimeline: false, onHashFeed: false, });
  case LOGIN_PAGE_ERROR:
    return Object.assign({}, serverInitialState, { errorMsg : action.msg });
  case LOGOUT:
    return serverInitialState;
  case START_SOUND:
    return Object.assign({}, state, { soundUrl : '/'+action.url+'.mp3', soundStart : true });
  case END_SOUND:
    return Object.assign({}, state, { soundStart : false });
  default:
    return state;
  }
};

export default server;

