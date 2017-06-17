import { take, fork, call, select, put} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  TOMAIN, LOGIN, GET_FEED_LIST, GET_FEED, POST_FEED,
  GET_REPLY_LIST, GET_REPLY, POST_REPLY,
  POST_LIKES, POST_DISLIKES, GET_LIKES, GET_DISLIKES,
  START_CHAT, GET_CHAT_LIST, GET_CHAT, POST_CHAT, SET_CHAT_LIST,
  GET_TIMELINE_LIST, DELETE_FEED, DELETE_REPLY, POST_FRIEND, GET_HASHFEED_LIST,
  GET_MULTICHATROOM_LIST, CREATE_MULTICHAT, START_MULTICHAT,
  GET_MULTICHAT_LIST, GET_MULTICHAT, POST_MULTICHAT, SET_MULTICHAT_LIST,
  MAFIA_GENERAL, MAFIA_TARGET, CHANGE_PROFILE,
  loginSuccess, loginPageError, getFeedList, setFeedList, setFeed, getReplyList, setReplyList, setReply,
  getLikes, getDislikes, setLikes, setDislikes,
  getChatRoomID, getChatList, setChatList, setChat, getChat,
  getMultiChatRoomList, setMultiChatRoomList,// getMultiChatRoomID,
  getMultiChatList, setMultiChatList, setMultiChat, getMultiChat,
  setUserList, GET_USER_LIST, getTimelineList, setNick, setPW
} from './actions';

//const url = 'http://localhost:8000';
const url = 'http://13.124.80.116:8001';

export function* postSignUp() {
  const state = yield select();
  const signUpInfo = {
    'id': state.server.newID,
    'nickname': state.server.newNick,
    'password': state.server.newPW
  };
  const response = yield call(fetch, url + '/signup/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signUpInfo)
  });
  // if you want to access response body, do like this
  // const res = yield response.json();
  // console.log(res);

  if(response.ok === false) {
    let res = {};
    try {
      res = yield response.json();
    }
    catch(e) { res.detail = 'Server not responding.'; }
    yield put(loginPageError(res.detail));
  }
}

export function* postLogin() {
  const state = yield select();
  const hash = new Buffer(`${state.server.ID}:${state.server.PW}`).toString('base64');
  const response = yield call(fetch, url + '/login/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`
    }
  });
  const responseProfile = yield call(fetch, url + '/users/profile/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${hash}`
    }
  });
  if(response.ok && responseProfile.ok) {
    yield put(loginSuccess(hash));
    let res;
    try {
      res = yield responseProfile.json();
    }
    catch(e) {
      window.location.href = '/notfound/';
      return;
    }
    yield put(setNick(res.nickname));
  }
  else {
    let res = {};
    try {
      res = yield response.json();
    }
    catch(e) { res.detail = 'Server not responding.'; }
    yield put(loginPageError(res.detail));
  }
}

export function* fetchTimelineList() {
  const state = yield select();
  const response = yield call(fetch, url + '/feed/user/' + state.server.timelineUser + '/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    window.location.href = '/notfound/';
    return;
  }
  yield put(setFeedList(res.id));
}


export function* fetchHashFeedList() {
  const state = yield select();
  console.log('fetchHashFeedlist');
  const response = yield call(fetch, url + '/hashtag/' + state.server.tagname + '/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    window.location.href = '/notfound/';
    return;
  }
  yield put(setFeedList(res.id));
}


export function* fetchFeedList() {
  const state = yield select();
  const response = yield call(fetch, url + '/feed/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    window.location.href = '/notfound/';
    return;
  }
  yield put(setFeedList(res.id));
}

export function* fetchFeed(id) {
  const state = yield select();
  const response = yield call(fetch, url + '/feed/' + id.toString() + '/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    window.location.href = '/notfound/';
    return;
  }

  yield put(setFeed(res.id, res));
}

export function* postFeed(contents, scope, feedtype) {
  if (contents === '')
    return;

  const state = yield select();
  const response = yield call(fetch, url + '/feed/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: contents,
      scope: scope,
      feedtype: feedtype,
    })
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  yield put(getFeedList()); // refresh news feed
}

export function* deleteFeed(id) {
  const state = yield select();
  const response = yield call(fetch, url + '/feed/' + id.toString() + '/', {
    method: 'DELETE',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  
  if (state.server.onTimeline)
    yield put(getTimelineList());
  else
    yield put(getFeedList());
}


export function* fetchLikes(id) {
  const state = yield select();
  const response = yield call(fetch, url + '/feed/' + id.toString() + '/likes/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    window.location.href = '/notfound/';
    return;
  }
  const didLike = (res.likes.indexOf(state.server.ID) !== -1);
  yield put(setLikes(id, res.likes, didLike));
}

export function* fetchDislikes(id) {
  const state = yield select();
  const response = yield call(fetch, url + '/feed/' + id.toString() + '/dislikes/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    window.location.href = '/notfound/';
    return;
  }
  const didDislike = (res.dislikes.indexOf(state.server.ID) !== -1);
  yield put(setDislikes(id, res.dislikes, didDislike));
}

export function* postLikes(id) {
  const state = yield select();
  const req = (state.feed.feedList[id].didLike)?'DELETE':'POST';
  const response = yield call(fetch, url + '/feed/' + id.toString() + '/likes/', {
    method: req,
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    }
  });
  if(response.ok === false) {
    return;
  }
  yield put(getLikes(id));
}

export function* postDislikes(id) {
  const state = yield select();
  const req = (state.feed.feedList[id].didDislike)?'DELETE':'POST';
  const response = yield call(fetch, url + '/feed/' + id.toString() + '/dislikes/', {
    method: req,
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    }
  });
  if(response.ok === false) {
    return;
  }
  yield put(getDislikes(id));
}

export function* fetchReplyList(feedId) {
  const state = yield select();
  const response = yield call(fetch, url + '/feed/' + feedId.toString() + '/reply/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    window.location.href = '/notfound/';
    return;
  }
  yield put(setReplyList(feedId, res.id));
}

export function* fetchReply(feedId, replyId) {
  const state = yield select();
  const response = yield call(fetch, url + '/reply/' + replyId.toString() + '/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    window.location.href = '/notfound/';
    return;
  }
  yield put(setReply(feedId, replyId, res));
}

export function* postReply(feedId, contents) {
  if (contents === '')
    return;

  const state = yield select();
  const response = yield call(fetch, url + '/feed/' + feedId.toString() + '/reply/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: contents
    })
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  yield put(getReplyList(feedId)); // refresh news feed
}

export function* deleteReply(feedId, replyId) {
  const state = yield select();
  const response = yield call(fetch, url + '/reply/' + replyId.toString() + '/', {
    method: 'DELETE',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }

  yield put(getReplyList(feedId));
}

export function* createMultiChat() {
  const state = yield select();
  const response = yield call(fetch, url + '/multichat/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    }
  });
  //const res = yield response.json();
  if(response.ok === true) {
    //yield put(getChatRoomID(res.id));
    //const st = yield select();
    console.log('ready to put getMultiChatRoomList!');
    yield put(getMultiChatRoomList());
  }
  else {
    let res = {};
    try {
      res = yield response.json();
    }
    catch (e) {
      res.message = 'POST /multichat/ error.';
    }
  }
}

export function* fetchMultiChatRoomList() {
  const state = yield select();
  const response = yield call(fetch, url + '/multichat/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    //window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    //window.location.href = '/notfound/';
    return;
  }
  let list = [];
  let enterList = [];
  let countList = [];
  for(let i in res){
    list.push(res[i].id);
    countList.push(res[i].users.length);
    if (res[i].users.indexOf(state.server.ID) !== -1) {
      enterList.push(res[i].id);
    }
  }

  yield put(setMultiChatRoomList(list, enterList, countList));
}
/*
export function* fetchMultiChatRoom(id) {
  const state = yield select();
  const response = yield call(fetch, url + '/feed/' + id.toString() + '/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    window.location.href = '/notfound/';
    return;
  }

  yield put(setFeed(res.id, res));
}*/

export function* startMultiChat(multichatRoomID) {
  const state = yield select();
  if(multichatRoomID === null)
    return;
  const response = yield call(fetch, url + '/multichat/enter/' + multichatRoomID + '/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    }
  });
  //const res = yield response.json();
  if(response.ok === true) {
    //yield put(getChatRoomID(res.id));
    const st = yield select();
    console.log('st.multichat.multichatRoomID: ',st.multichat.multichatRoomID);
    yield put(getMultiChatList(st.multichat.multichatRoomID));
  }
  else {
    let res = {};
    try {
      res = yield response.json();
    }
    catch (e) {
      res.message = 'POST /multichat/enter/<id> error.';
    }
  }
}

export function* fetchMultiChatList(multichatRoomID) {
  console.log('fetchMultiChatList Saga start');
  console.log('multichatRoomID: ', multichatRoomID);
  const state = yield select();
  const response = yield call(fetch, url + '/multichat/' + multichatRoomID + '/all/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  console.log('response.ok : ', response.ok);
  if(response.ok === false) {
    //window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    //window.location.href = '/notfound/';
    return;
  }
  console.log('fetchMultiChatList Saga res: ',res);
  yield put(setMultiChatList(res.chat));
}

export function* fetchMultiChat(multichatRoomID) {
  const state = yield select();
  const response = yield call(fetch, url + '/multichat/' + multichatRoomID + '/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    //window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    //window.location.href = '/notfound/';
    return;
  }
  yield put(setMultiChat(res.chat));
}

export function* postMultiChat(multichatRoomID, contents) {
  if (contents === '')
    return;

  const state = yield select();
  //console.log('postMultiChatSaga-multichatRoomID: ', multichatRoomID,' contents: ',contents);
  const response = yield call(fetch, url + '/multichat/' + multichatRoomID + '/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: contents
    })
  });
  //console.log('postMultiChatSaga-response.code: ', response.status);
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  yield put(getMultiChat(multichatRoomID)); // refresh chat log
}

export function* postMafiaGeneral(multichatRoomID, suburl) {
  const state = yield select();
  yield call(fetch, url + '/mafia/' + multichatRoomID + '/' + suburl + '/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    },
  });
}

export function* postMafiaTarget(multichatRoomID, target) {
  const state = yield select();
  yield call(fetch, url + '/mafia/' + multichatRoomID + '/target/' + target + '/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    },
  });
}

export function* startChat(username) {
  const state = yield select();
  if(username === '')
    return;
  const response = yield call(fetch, url + '/chat/user/' + username + '/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    }
  });
  const res = yield response.json();
  if(response.ok === true) {
    yield put(getChatRoomID(res.id));
    const st = yield select();
    yield put(getChatList(st.chat.chatRoomID));
  }
  else {
    let res = {};
    try {
      res = yield response.json();
    }
    catch (e) {
      res.message = 'POST /chat/user/username error.';
    }
  }
}

export function* fetchChatList(chatRoomID) {
  const state = yield select();
  const response = yield call(fetch, url + '/chat/' + chatRoomID + '/all/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    //window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    //window.location.href = '/notfound/';
    return;
  }
  //console.log('Chat res.chat: ',res.chat);
  yield put(setChatList(res.chat));
}

export function* fetchChat(chatRoomID) {
  const state = yield select();
  const response = yield call(fetch, url + '/chat/' + chatRoomID + '/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    //window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    //window.location.href = '/notfound/';
    return;
  }
  yield put(setChat(res.chat));
}

export function* postChat(chatRoomID, contents) {
  if (contents === '')
    return;

  const state = yield select();
  //console.log('postChatSaga-chatRoomID: ', chatRoomID,' contents: ',contents);
  const response = yield call(fetch, url + '/chat/' + chatRoomID + '/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: contents
    })
  });
  //console.log('postChatSaga-response.code: ', response.status);
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  yield put(getChat(chatRoomID)); // refresh chat log
}

export function* fetchUserList() {
  const state = yield select();
  const response = yield call(fetch, url + '/users/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  let res;
  try {
    res = yield response.json();
  }
  catch(e) {
    window.location.href = '/notfound/';
    return;
  }
  let userList = [];
  res.map((obj) => {
    userList.push(obj.username);
  });
  yield put(setUserList(userList));
}

export function* postFriend(username) {
  const state = yield select();
  const response = yield call(fetch, url + '/friend/' + username + '/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if (response.ok === false) {
    //errorbox 띄워주면 좋겠음
  }
}

export function* fetchProfile() {
  const state = yield select();
  const response = yield call(fetch, url + '/users/profile/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
}

export function* postProfile(newNick, newPW, retypePW) {
  const state = yield select();
  const responseChangeNick = yield call(fetch, url + '/users/profile/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nickname: newNick
    })
  });
  if(newPW !== null && newPW.length >= 4 && newPW === retypePW){
    const responseChangePW = yield call(fetch, url + '/users/password/', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${state.server.hash}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: newPW
      })
    });
    if(responseChangePW.ok === false){
      //errorbox?
    }else{
      yield put(setPW(newPW));
      const hash = new Buffer(`${state.server.ID}:${state.server.PW}`).toString('base64');
      yield put(loginSuccess(hash));
    }
  }
  if (responseChangeNick.ok === false) {
    //errorbox 띄워주면 좋겠음
  }else{
    yield put(setNick(newNick));
  }
}


export function* watchSignUp() {
  const t = true;
  while (t) {
    yield take(TOMAIN);
    yield call(postSignUp);
  }
}

export function* watchLogin() {
  const t = true;
  while (t) {
    yield take(LOGIN);
    yield call(postLogin);
  }
}


export function* watchGetFeedList() {
  const t = true;
  while(t) {
    yield take(GET_FEED_LIST);
    yield call(fetchFeedList);
  }
}

export function* watchGetFeed() {
  const t = true;
  while(t) {
    const action = yield take(GET_FEED);
    // Use fork to send multiple request at the same time
    yield fork(fetchFeed, action.id);
  }
}

export function* watchPostFeed() {
  const t = true;
  while(t) {
    const action = yield take(POST_FEED);
    yield call(postFeed, action.contents, action.scope, action.feedtype);
  }
}


export function* watchGetLikes() {
  const t = true;
  while(t) {
    const action = yield take(GET_LIKES);
    yield fork(fetchLikes, action.id);
  }
}

export function* watchGetDislikes() {
  const t = true;
  while(t) {
    const action = yield take(GET_DISLIKES);
    yield fork(fetchDislikes, action.id);
  }
}

export function* watchPostLikes() {
  const t = true;
  while(t) {
    const action = yield take(POST_LIKES);
    yield call(postLikes, action.id);
  }
}

export function* watchPostDislikes() {
  const t = true;
  while(t) {
    const action = yield take(POST_DISLIKES);
    yield call(postDislikes, action.id);
  }
}

export function* watchGetReplyList() {
  const t = true;
  while(t) {
    const action = yield take(GET_REPLY_LIST);
    // Use fork to send multiple request at the same time
    yield fork(fetchReplyList, action.feedId);
  }
}

export function* watchGetReply() {
  const t = true;
  while(t) {
    const action = yield take(GET_REPLY);
    // Use fork to send multiple request at the same time
    yield fork(fetchReply, action.feedId, action.replyId);
  }
}

export function* watchPostReply() {
  const t = true;
  while(t) {
    const action = yield take(POST_REPLY);
    yield call(postReply, action.feedId, action.contents);
  }
}

export function* watchCreateMultiChat() {
  const t = true;
  while(t) {
    yield take(CREATE_MULTICHAT);
    console.log('take CREATE_MULTICHAT!');
    yield call(createMultiChat);
  }
}

export function* watchGetChatList() {
  const t = true;
  while(t) {
    const action = yield take(GET_CHAT_LIST);
    yield call(fetchChatList, action.chatRoomID);
  }
}

export function* watchStartMultiChat() {
  const t = true;
  while(t) {
    const action = yield take(START_MULTICHAT);
    console.log('action.multichatRoomID: ', action.multichatRoomID);
    yield call(startMultiChat, action.multichatRoomID);
  }
}

export function* watchGetMultiChatList() {
  const t = true;
  while(t) {
    const action = yield take(GET_MULTICHAT_LIST);
    console.log('take GET_MULTICHAT_LIST: action.multichatRoomID: ',action.multichatRoomID);
    yield call(fetchMultiChatList, action.multichatRoomID);
  }
}

export function* watchGetMultiChat() {
  const t = true;
  while(t) {
    yield delay(100);
    const state = yield select();
    if(state.multichat.multichatOn){
      const action = yield take(GET_MULTICHAT);
      // Use fork to send multiple request at the same time
      yield fork(fetchMultiChat, action.multichatRoomID);
    }
  }
}

export function* watchPostMultiChat() {
  const t = true;
  while(t) {
    const action = yield take(POST_MULTICHAT);
    yield call(postMultiChat, action.multichatRoomID, action.contents);
  }
}

export function* watchStartChat() {
  const t = true;
  while(t) {
    const action = yield take(START_CHAT);
    yield call(startChat, action.username);
  }
}

export function* watchGetMultiChatRoomList() {
  const t = true;
  while(t) {
    yield take(GET_MULTICHATROOM_LIST);
    yield call(fetchMultiChatRoomList);
  }
}

export function* watchGetChat() {
  const t = true;
  while(t) {
    yield delay(100);
    const state = yield select();
    if(state.chat.chatOn){
      const action = yield take(GET_CHAT);
      // Use fork to send multiple request at the same time
      yield fork(fetchChat, action.chatRoomID);
    }
  }
}

export function* watchPostChat() {
  const t = true;
  while(t) {
    const action = yield take(POST_CHAT);
    yield call(postChat, action.chatRoomID, action.contents);
  }
}

export function* watchGetTimelineList() {
  const t = true;
  while(t) {
    yield take(GET_TIMELINE_LIST);
    yield call(fetchTimelineList);
  }
}

export function* watchGetHashFeedList() {
  const t = true;
  while(t) {
    yield take(GET_HASHFEED_LIST);
    yield call(fetchHashFeedList);
  }
}

export function* createChatReciever() {
  const t = true;
  yield take(SET_CHAT_LIST);
  while(t) {
    yield delay(1000);
    const state = yield select();
    if (state.chat.chatOn)
      yield put(getChat(state.chat.chatRoomID));
  }
}

export function* createMultiChatRoomReciever() {
//  yield take(SET_MULTICHAT_LIST);
  const t = true;
  let state;
  while(t){
    yield delay(1000);
    state = yield select();
    //console.log('ABCABC: ', state.multichat.multichatOn, ':' , state.multichat.multichatRoomID);
    if(state.multichat.multichatOn === true && state.multichat.multichatRoomID === null)
      yield put(getMultiChatRoomList());
  }
}

export function* createMultiChatReciever() {
  const t = true;
  yield take(SET_MULTICHAT_LIST);
  while(t) {
    yield delay(1000);
    const state = yield select();
    if (state.multichat.multichatOn === true && state.multichat.multichatRoomID !== null)
      yield put(getMultiChat(state.multichat.multichatRoomID));
  }
}

export function* watchMafiaGeneral() {
  const t = true;
  while(t) {
    const action = yield take(MAFIA_GENERAL);
    yield call(postMafiaGeneral, action.roomID, action.suburl);
  }
}

export function* watchMafiaTarget() {
  const t = true;
  while(t) {
    const action = yield take(MAFIA_TARGET);
    yield call(postMafiaTarget, action.roomID, action.target);
  }
}

// calls the function only once
export function* watchGetUserList() {
  yield take(GET_USER_LIST);
  yield call(fetchUserList);
}

export function* watchDeleteFeed() {
  const t = true;
  while(t) {
    const action = yield take(DELETE_FEED);
    yield call(deleteFeed, action.id);
  }
}

export function* watchDeleteReply() {
  const t = true;
  while(t) {
    const action = yield take(DELETE_REPLY);
    yield call(deleteReply, action.feedId, action.replyId);
  }
}

export function* watchPostFriend() {
  const t = true;
  while(t) {
    const action = yield take(POST_FRIEND);
    yield call(postFriend, action.username);
  }
}

export function* watchChangeProfile() {
  const t = true;
  while(t) {
    const action = yield take(CHANGE_PROFILE);
    console.log('chpro');
    yield call(postProfile, action.newNick, action.newPW, action.retypePW);
  }
}

export function* rootSaga() {
  yield fork(watchSignUp);
  yield fork(watchLogin);

  yield fork(watchGetFeedList);
  yield fork(watchGetFeed);
  yield fork(watchPostFeed);
  yield fork(watchDeleteFeed);

  yield fork(watchPostLikes);
  yield fork(watchPostDislikes);
  yield fork(watchGetLikes);
  yield fork(watchGetDislikes);

  yield fork(watchGetReplyList);
  yield fork(watchGetReply);
  yield fork(watchPostReply);
  yield fork(watchDeleteReply);

  yield fork(watchStartChat);
  yield fork(watchGetChatList);
  yield fork(watchGetChat);
  yield fork(watchPostChat);
  yield fork(createChatReciever);

  yield fork(watchGetTimelineList);
  yield fork(watchGetHashFeedList);
  yield fork(watchGetUserList);
  yield fork(watchPostFriend);

  yield fork(watchCreateMultiChat);
  yield fork(watchGetMultiChatRoomList);
  yield fork(createMultiChatRoomReciever);
  yield fork(watchStartMultiChat);
  yield fork(watchGetMultiChatList);
  yield fork(watchGetMultiChat);
  yield fork(watchPostMultiChat);
  yield fork(createMultiChatReciever);

  yield fork(watchMafiaGeneral);
  yield fork(watchMafiaTarget);
  yield fork(watchChangeProfile);
}
