import { put, call, takeEvery } from 'redux-saga/effects';

import { GET_USER_DATA } from 'constans';
import { setUserData } from 'actions/action_user';
import { API } from 'utils/api';

function* userData() {
  const api = new API();

  try {
    const { data } = yield call(api.getUser);
    yield put(setUserData(data));
  } catch(err) {
    console.log(err.message);
  }
}

function* watchForUser() {
  yield takeEvery(GET_USER_DATA, userData);
}

export default watchForUser;