import { put, call, takeEvery, select } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { getChatDialogs } from './selectors';
import { API } from 'utils/api';

function* fetchData() {
  const api = new API();

  try {
    const state = yield select(getChatDialogs);
    const data = yield call(api.getAllMessages, state.dialogId);
   
    yield put({ type: actionTypes.MESSAGES_LOAD_SUCCESS, payload: data });
  } catch(e) {
    console.log(e.message);
  }
}

function* watchFetchData() {
  yield takeEvery(actionTypes.MESSAGES_REQUESTED, fetchData);
}

export default watchFetchData;