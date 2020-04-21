import { call, takeEvery } from 'redux-saga/effects';

import { CREATED_MESSAGE } from 'constans';
import { APIMsg } from 'utils/api/msg';

function* fetchMessage(action) {
  try {
    yield call(new APIMsg().createMessage, action.payload);
  } catch(err) {
    console.log(err.message); // implement error handling
  }
}

function* watchForMessage() {
  yield takeEvery(CREATED_MESSAGE, fetchMessage);
}

export default watchForMessage;