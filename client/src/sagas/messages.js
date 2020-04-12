import { put, call, select, takeEvery } from 'redux-saga/effects';

import { MESSAGES_REQUESTED } from 'constans';
import { loadMessages } from 'actions/action_messages';
import { APIMsg } from 'utils/api/msg';

function* allMessages() {
  const { dialogId } = yield select(state => state.dialog);
  const { authorizedUser } = yield select(state => state.authUser);

  try {
    const messages = yield call(new APIMsg().getMessages);
    const findLastMsg = messages[messages.length-1];
    const noMsgOwner = findLastMsg.user._id !== authorizedUser._id;
    yield put(loadMessages(messages));

    if (!findLastMsg.readed && noMsgOwner) {
      yield call(new APIMsg().getMessagesRead, {dialogId});
    }
  } catch(err) {
    console.log(err.message);
  }
}

function* watchForMessages() {
  yield takeEvery(MESSAGES_REQUESTED, allMessages);
}

export default watchForMessages;