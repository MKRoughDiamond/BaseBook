import { take, fork, call, select, put } from 'redux-saga/effects';
import { TOMAIN, LOGIN, GET_FEED_LIST, GET_FEED, POST_FEED, POST_LIKES, POST_DISLIKES, GET_LIKES, GET_DISLIKES,
  loginSuccess, loginPageError, getFeedList, setFeedList, setFeed, getLikes, getDislikes, setLikes, setDislikes} from './actions';

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
  yield put(setLikes(id, res.likes));
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
  yield put(setDislikes(id, res.dislikes));
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

export function* postLikes(id) {
  const state = yield select();
  const req = (state.feed.feedList[id].doLike)?'DELETE':'POST';
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
  const req = (state.feed.feedList[id].doDislike)?'DELETE':'POST';
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

export function* watchPostFeed() {
  const t = true;
  while(t) {
    const action = yield take(POST_FEED);
    yield call(postFeed, action.contents, action.scope);
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
}
