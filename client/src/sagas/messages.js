import { put, call, select, takeEvery } from 'redux-saga/effects';

import { MESSAGES_REQUESTED } from 'constans';
import { loadMessages } from 'actions/action_messages';
import { API } from 'utils/api';

function* allMessages() {
  const api = new API();
  const { dialogId } = yield select(state => state.dialog);
  const { authorizedUser } = yield select(state => state.user);

  try {
    const messages = yield call(api.getMessages);
    const findLastMsg = messages[messages.length-1];
    yield put(loadMessages(messages));

    if (!findLastMsg.readed && findLastMsg.user._id !== authorizedUser._id) {
      yield call(api.getMessagesRead, {dialogId});
    }
  } catch(err) {
    console.log(err.message); // implement error handling
  }
}

function* watchForMessages() {
  yield takeEvery(MESSAGES_REQUESTED, allMessages);
}

export default watchForMessages;