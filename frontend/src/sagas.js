import { take, fork, call, select, put} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  TOMAIN, LOGIN, GET_FEED_LIST, GET_FEED, POST_FEED,
  GET_REPLY_LIST, GET_REPLY, POST_REPLY,
  POST_LIKES, POST_DISLIKES, GET_LIKES, GET_DISLIKES,
  START_CHAT, GET_CHAT_LIST, GET_CHAT, POST_CHAT, SET_CHAT_LIST, GET_TIMELINE_LIST, DELETE_FEED, DELETE_REPLY, POST_FRIEND, GET_HASHFEED_LIST,
  loginSuccess, loginPageError, getFeedList, setFeedList, setFeed, getReplyList, setReplyList, setReply,
  getLikes, getDislikes, setLikes, setDislikes,
  getChatRoomID, getChatList, setChatList, setChat, getChat,
  setUserList, GET_USER_LIST, getTimelineList
} from './actions';

const url = 'http://localhost:8000';
//const url = 'http://13.124.80.116:8000';

export function* postSignUp() {
  const state = yield select();
  const signUpInfo = {
    'id': state.server.newID,
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
  if(response.ok) {
    yield put(loginSuccess(hash));
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

export function* postFeed(contents, scope) {
  const state = yield select();
  const response = yield call(fetch, url + '/feed/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: contents,
      scope: scope
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
  const didLike = (res.likes.indexOf(state.server.ID) !== -1) ? true : false;
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
  const didDislike = (res.dislikes.indexOf(state.server.ID) !== -1) ? true : false;
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


export function* watchSignUp() {
  let state;
  do {
    state = yield select();
    yield take(TOMAIN);
    yield call(postSignUp);
  }
  while(state.server.loggedIn === false);
}

export function* watchLogin() {
  let state;
  do {
    state = yield select();
    yield take(LOGIN);
    yield call(postLogin);
  }
  while(state.server.loggedIn === false);
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
    yield call(postFeed, action.contents, action.scope);
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

export function* watchStartChat() {
  let state;
  do {
    state = yield select();
    const action = yield take(START_CHAT);
    yield call(startChat, action.username);
  }
  while(state.chat.otherUsername === null);
}

export function* watchGetChatList() {
  const t = true;
  while(t) {
    const action = yield take(GET_CHAT_LIST);
    yield call(fetchChatList, action.chatRoomID);
  }
}

export function* watchGetChat() {
  const t = true;
  while(t) {
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
    yield put(getChat(state.chat.chatRoomID));
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

export function* rootSaga() {
  yield fork(watchSignUp);
  yield fork(watchLogin);
  yield fork(watchGetFeedList);
  yield fork(watchGetFeed);
  yield fork(watchPostFeed);
  yield fork(watchPostLikes);
  yield fork(watchPostDislikes);
  yield fork(watchGetLikes);
  yield fork(watchGetDislikes);
  yield fork(watchGetReplyList);
  yield fork(watchGetReply);
  yield fork(watchPostReply);
  yield fork(watchStartChat);
  yield fork(watchGetChatList);
  yield fork(watchGetChat);
  yield fork(watchPostChat);
  yield fork(watchGetTimelineList);
  yield fork(watchGetHashFeedList);
  yield fork(createChatReciever);
  yield fork(watchGetUserList);
  yield fork(watchDeleteFeed);
  yield fork(watchDeleteReply);
}
