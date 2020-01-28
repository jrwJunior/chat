import { put, call, takeEvery } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { API } from 'utils/api';

function* fetchData() {
  const api = new API();

  try {
    const data = yield call(api.getAllDialogs);

    yield put({ type: actionTypes.DIALOGS_LOAD_SUCCESS, payload: data });
  } catch(e) {
    console.log(e.message);
  }
}

function* watchFetchData() {
  yield takeEvery(actionTypes.DEALOGS_REQUESTED, fetchData);
}

export default watchFetchData;