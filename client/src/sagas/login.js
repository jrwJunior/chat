import { put, call, take, fork } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { setLoginData, setLoginError } from 'actions/action_auth';
import { APIAuth } from 'utils/api/auth';

function* authorization(action) {
  try {
    const data = yield call(new APIAuth().login, action.payload);
    yield put(setLoginData(data));
  } catch(err) {
    const { message, status } = JSON.parse(err.message);

    yield put(setLoginError({
      error: message,
      status
    }));
  }
}

function* watchAuthorization() {
  while(true) {
    const data = yield take(actionTypes.LOGIN_REQUESTED);
    yield fork(authorization, data);
  }
}

export default watchAuthorization;