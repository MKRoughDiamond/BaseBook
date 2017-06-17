import { SETID, SETNICK, SETPW, NEWID, NEWNICK, NEWPW, RETYPEPW, CONFIRMPW,
  TOMAIN, TOSIGNUP, LOGIN_SUCCESS, LOGIN_PAGE_ERROR, TOTIMELINE, TOFEED, LOGOUT,
  TOHASHFEED, TOPROFILE, START_SOUND, END_SOUND
} from '../actions';

const serverInitialState = {
  ID: '',
  Nick: '',
  PW: '',
  hash: null,
  newID: '',
  newNick: '',
  newPW: '',
  retypePW: '',
  confirmPW: '',
  isLogin: true,
  loggedIn: false,
  errorMsg: null,
  onTimeline: false,
  timelineUser: null,
  onHashFeed: false,
  tagname: '',
  onProfile: false,
  soundUrl : null,
  soundStart : false
};

const server = (state = serverInitialState, action) => {
  switch(action.type) {
  case SETID:
    return Object.assign({}, state, { ID : action.ID });
  case SETNICK:
    console.log('SETNICK');
    return Object.assign({}, state, { Nick : action.Nick });
  case SETPW:
    return Object.assign({}, state, { PW : action.PW });
  case NEWID:
    return Object.assign({}, state, { newID : action.newID });
  case NEWNICK:
    console.log('NEWNICK');
    return Object.assign({}, state, { newNick : action.newNick });
  case NEWPW:
    return Object.assign({}, state, { newPW : action.newPW });
  case RETYPEPW:
    return Object.assign({}, state, { retypePW : action.retypePW });
  case CONFIRMPW:
    return Object.assign({}, state, { confirmPW : action.confirmPW });
  case TOFEED:
    return Object.assign({}, state, {
      onTimeline: false,
      onHashFeed: false,
      onProfile : false,
    });
  case TOPROFILE:
    return Object.assign({}, state, {
      onTimeline: false,
      onHashFeed: false,
      onProfile : true,
    });
  case TOMAIN:
    return Object.assign({}, state,
      { isLogin : true,
        ID : '',
        Nick : '',
        PW : '',
        onTimeline: false,
        onHashFeed: false,
        onProfile : false,});
  case TOSIGNUP:
    return Object.assign({}, state,
      { isLogin : false,
        newID : '',
        newNick : '',
        newPW : '',
        retypePW : '',
        onTimeline: false,
        onHashFeed: false,
        onProfile : false,});
  case TOTIMELINE:
    return Object.assign({}, state,
      { onTimeline : true,
        onHashFeed : false,
        onProfile  : false,
        timelineUser : action.username, });
  case TOHASHFEED:
    return Object.assign({}, state,
      { onTimeline : false,
        onHashFeed : true,
        onProfile  : false,
        tagname : action.tagname});
  case LOGIN_SUCCESS:
    return Object.assign({}, state, { 
      loggedIn : true, 
      hash: action.hash,
      onTimeline: false, 
      onHashFeed: false,
      onProfile : false,
    });
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

