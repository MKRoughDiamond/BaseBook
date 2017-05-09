import { take, fork, call, select, put } from 'redux-saga/effects';
import { TOMAIN, LOGIN, GET_FEED_LIST, GET_FEED, POST_FEED,
  loginSuccess, loginPageError, getFeedList, setFeedList, setFeed } from './actions';

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
  console.log('Got feed ' + res.id.toString());
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

export function* rootSaga() {
  yield fork(watchSignUp);
  yield fork(watchLogin);
  yield fork(watchGetFeedList);
  yield fork(watchGetFeed);
  yield fork(watchPostFeed);
}
