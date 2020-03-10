import { put, call, takeEvery } from 'redux-saga/effects';

import { DEALOGS_REQUESTED } from 'constans';
import { dialogsLoad } from 'actions/action_dialogs';
import { API } from 'utils/api';

function* dialogsAll() {
  const api = new API();

  try {
    const { data } = yield call(api.getAllDialogs);
    yield put(dialogsLoad(data));
  } catch(err) {
    console.log(err.message);
  }
}

function* watchForDailogs() {
  yield takeEvery(DEALOGS_REQUESTED, dialogsAll);
}

export default watchForDailogs;