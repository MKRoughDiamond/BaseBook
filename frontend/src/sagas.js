import { take, fork, call, select, put} from 'redux-saga/effects';

import { TOMAIN, LOGIN, GET_FEED_LIST, loginSuccess, loginPageError, setFeedList } from './actions';

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
    yield put(loginPageError(res.message));
  }
}

export function* postLogin() {
  const state = yield select();
  const loginInfo = {
    'id': state.server.ID,
    'password': state.server.PW
  };
  const response = yield call(fetch, '/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginInfo)
  });
  if(response.ok) {
    yield put(loginSuccess());
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
  const response = yield call(fetch, '/feed/', {method: 'GET'});
  if(response.ok === false) {
    window.location.href = '/notfound/';
    return;
  }
  let res = {};
  try {
    res = yield response.json();
  }
  catch(e) {
    window.location.href = '/notfound/';
    return;
  }
  yield put(setFeedList(res.id));
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

export function* rootSaga() {
  yield fork(watchSignUp);
  yield fork(watchLogin);
  yield fork(watchGetFeedList);
}
