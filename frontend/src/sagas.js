import { take, fork, call, select} from 'redux-saga/effects';

import { TOMAIN/*, LOGIN*/ } from './actions';

export function* watchSignUp() {
  yield take(TOMAIN);
  const state = yield select();
  const signUpInfo = {
    'username': state.server.newID,
    'password': state.server.newPW
  };
  console.log(signUpInfo);
  const response = yield call(fetch, 'http://13.124.80.116:8000/signup/', {
    method: 'POST',
    body: JSON.stringify(signUpInfo)
  });
  console.log(response);
  if(response.ok)
    console.log('회원가입 ok!');
}

export function* watchLogin() {
  yield take(LOGIN);
  const state = yield select();
  const loginInfo = {
    'username': state.server.ID,
    'password': state.server.PW
  };
  console.log(loginInfo);
  const response = yield call(fetch, 'http://13.124.80.116:8000/login/', {
    method: 'POST',
    body: JSON.stringify(loginInfo)
  });
  if(response.ok)
    console.log('로그인 ok!');
}

  
  

export function* rootSaga() {
  yield fork(watchSignUp);
  yield fork(watchLogin);
}
