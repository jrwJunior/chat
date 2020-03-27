import { put, call, takeEvery } from 'redux-saga/effects';

import { GET_USER } from 'constans';
import { setUser } from 'actions/action_user';
import { API } from 'utils/api';

function* userData2(action) {
  const api = new API();

  try {
    const { data } = yield call(api.getContact, action.payload);
    yield put(setUser(data));
  } catch(err) {
    console.log(err.message);
  }
}

function* watchForUser() {
  yield takeEvery(GET_USER, userData2);
}

export default watchForUser;