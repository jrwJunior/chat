import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { setUserData } from 'actions/action_user';
import { API } from 'utils/api';

const api = new API();

function* userData() {
  try {
   const { data } = yield call(api.getUser);

   yield put(setUserData(data));
  } catch(err) {
    console.log(err.message);
  }
}

function* userFlow() {
  yield takeEvery(actionTypes.GET_USER_DATA, userData);
}

export default userFlow;