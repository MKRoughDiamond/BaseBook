import { take, fork, call, select} from 'redux-saga/effects';

import { TOMAIN, LOGIN } from './actions';

export function* watchSignUp() {
  yield take(TOMAIN);
  const state = yield select();
  const signUpInfo = {
    'id': state.server.newID,
    'password': state.server.newPW
  };
  console.log(signUpInfo);
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

  if(response.ok)
    console.log('회원가입 ok!');
}

export function* watchLogin() {
  yield take(LOGIN);
  const state = yield select();
  const loginInfo = {
    'id': state.server.ID,
    'password': state.server.PW
  };
  console.log(loginInfo);
  const response = yield call(fetch, '/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginInfo)
  });
  if(response.ok)
    console.log('로그인 ok!');
}

  
  

export function* rootSaga() {
  yield fork(watchSignUp);
  yield fork(watchLogin);
}
