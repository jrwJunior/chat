import { put, call, take, fork } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { setLoginData, setLoginError } from 'actions/action_auth';
import uploadFile from './uploadFile';
import { APIAuth } from 'utils/api/auth';

function* createAccount(action) {
  const { email, password } = action.payload;

  try {
    yield call(new APIAuth().createAccount, action.payload);
    const data = yield call(new APIAuth().login, { email, password });
    yield put(setLoginData(data));
    yield call(uploadFile);

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
    const data = yield take(actionTypes.REGISTER_REQUESTED);
    yield fork(createAccount, data);
  }
}

export default watchForLogin;