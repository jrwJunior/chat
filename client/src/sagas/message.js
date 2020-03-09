import { call, takeEvery } from 'redux-saga/effects';

import { CREATED_MESSAGE } from 'constans';
import { API } from 'utils/api';

function* fetchMessage(action) {
  const api = new API();

  try {
    yield call(api.createMessage, action.payload);
  } catch(err) {
    console.log(err.message); // implement error handling
  }
}

function* watchForMessage() {
  yield takeEvery(CREATED_MESSAGE, fetchMessage);
}

export default watchForMessage;