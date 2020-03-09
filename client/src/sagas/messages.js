import { put, call, takeEvery } from 'redux-saga/effects';

import { MESSAGES_REQUESTED } from 'constans';
import { loadMessages } from 'actions/action_messages';
import { API } from 'utils/api';

const api = new API();

function* allMessages(action) {
  try {
    const { data } = yield call(api.getMessages, action.payload);

    yield put(loadMessages(data));
  } catch(err) {
    console.log(err.message); // implement error handling
  }
}

function* watchForMessages() {
  yield takeEvery(MESSAGES_REQUESTED, allMessages);
}

export default watchForMessages;