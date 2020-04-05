import { put, call, take, fork } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { setLoginData, setLoginError } from 'actions/action_auth';
import { API } from 'utils/api';

function* fetchLogin(action) {
  const api = new API();

  try {
    const data = yield call(api.login, action.payload);

    yield put(setLoginData(data));
  } catch(err) {
    const { message, status } = JSON.parse(err.message);

    yield put(setLoginError({
      error: message,
      status
    }));
  }
}

function* watchForLogin() {
  while(true) {
    const data = yield take(actionTypes.LOGIN_REQUESTED);
    yield fork(fetchLogin, data);
  }
}

export default watchForLogin;