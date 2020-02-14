import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { dialogsLoad } from 'actions/action_dialogs';
import { API } from 'utils/api';

function* fetchAllDialogs() {
  const api = new API();

  try {
    const { data } = yield call(api.getAllDialogs);

    yield put(dialogsLoad(data));
  } catch(err) {
    console.log(err.message);
  }
}

function* watchForDialogs() {
  yield takeEvery(actionTypes.DEALOGS_REQUESTED, fetchAllDialogs);
}

export default watchForDialogs;