import { call, takeEvery } from 'redux-saga/effects';

import { DELETE_MESSAGE } from 'constans';
import { API } from 'utils/api';

const api = new API();

function* deleteMessage(action) {
  try {
    yield call(api.removeMessage, action.payload);
  } catch(err) {
    console.log(err.message); // implement error handling
  }
}

function* watchForMessage() {
  yield takeEvery(DELETE_MESSAGE, deleteMessage);
}

export default watchForMessage;