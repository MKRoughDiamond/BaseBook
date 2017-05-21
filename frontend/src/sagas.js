import { take, fork, call, select, put} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  TOMAIN, LOGIN, GET_FEED_LIST, GET_FEED, POST_FEED,
  GET_REPLY_LIST, GET_REPLY, POST_REPLY,
  POST_LIKES, POST_DISLIKES, GET_LIKES, GET_DISLIKES,
  START_CHAT, GET_CHAT_LIST, GET_CHAT, POST_CHAT, SET_CHAT_LIST, GET_TIMELINE_LIST,
  loginSuccess, loginPageError, getFeedList, setFeedList, setFeed, getReplyList, setReplyList, setReply,
  getLikes, getDislikes, setLikes, setDislikes,
  getChatRoomID, getChatList, setChatList, setChat, getChat
} from './actions';

export function* postSignUp() {
  const state = yield select();
  const signUpInfo = {
    'id': state.server.newID,
    'password': state.server.newPW
  };
  const response = yield call(fetch, '/signup/', {
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
    catch(e) { res.message = 'Server not responding.'; }
    console.log(res.message);
    yield put(loginPageError(res.message));
  }
}

export function* postLogin() {
  const state = yield select();
  const hash = new Buffer(`${state.server.ID}:${state.server.PW}`).toString('base64');
  const response = yield call(fetch, '/login/', {
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
    catch(e) { res.message = 'Server not responding.'; }
    yield put(loginPageError(res.message));
  }
}

export function* fetchTimelineList() {
  const state = yield select();
  console.log('fetchtimelinlist');
  const response = yield call(fetch, '/feed/user/' + state.server.timelineUser + '/', {
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
  const response = yield call(fetch, '/feed/', {
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
  //console.log('Feed res: ',res);
  yield put(setFeedList(res.id));
}

export function* fetchFeed(id) {
  const state = yield select();
  const response = yield call(fetch, '/feed/' + id.toString() + '/', {
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
  const response = yield call(fetch, '/feed/', {
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


export function* fetchLikes(id) {
  const state = yield select();
  const response = yield call(fetch, '/feed/' + id.toString() + '/likes/', {
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
  const response = yield call(fetch, '/feed/' + id.toString() + '/dislikes/', {
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
  const response = yield call(fetch, '/feed/' + id.toString() + '/likes/', {
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
  const response = yield call(fetch, '/feed/' + id.toString() + '/dislikes/', {
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
  const response = yield call(fetch, '/feed/' + feedId.toString() + '/reply/', {
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
  const response = yield call(fetch, '/reply/' + replyId.toString() + '/', {
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
  const response = yield call(fetch, '/feed/' + feedId.toString() + '/reply/', {
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


export function* startChat(username) {
  const state = yield select();
  const response = yield call(fetch, '/chat/user/' + username + '/', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${state.server.hash}`,
      'Content-Type': 'application/json'
    }
  });
  const res = yield response.json();
  //console.log(res);
  //console.log('res.id: ', res.id);
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
    console.log(res.message);
  }
}

export function* fetchChatList(chatRoomID) {
  const state = yield select();
  //console.log('fetchChatListSaga-chatRoomID: ',chatRoomID);
  const response = yield call(fetch, '/chat/' + chatRoomID + '/all/', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${state.server.hash}`
    }
  });
  //console.log('fetchChatListSaga-status: ', response.status);
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
  const response = yield call(fetch, '/chat/' + chatRoomID + '/', {
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
  const response = yield call(fetch, '/chat/' + chatRoomID + '/', {
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
    const action = yield take(GET_CHAT);
    //console.log('watchGetChatSaga-id: ',action.id);
    // Use fork to send multiple request at the same time
    yield fork(fetchChat, action.chatRoomID);
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

export function* createChatReciever() {
  const t = true;
  yield take(SET_CHAT_LIST);
  while(t) {
    yield delay(1000);
    const state = yield select();
    yield put(getChat(state.chat.chatRoomID));
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
  yield fork(createChatReciever);
}
