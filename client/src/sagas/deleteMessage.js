import { call, take, put, select, takeEvery } from 'redux-saga/effects';

import { DELETE_MESSAGE } from 'constans';
import { setMessages } from 'actions/action_messages';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';
import { API } from 'utils/api';

const api = new API();

function* fetchDeleteMessage() {
  const { dialogId, messages } = yield select(state => (
    {
      dialogId: state.dialog.dialogId,
      messages: state.chat_message.deletedMessages
    }
  ));

  try {
    yield call(api.removeMessage, {dialogId, messages});
  } catch(err) {
    console.log(err.message); // implement error handling
  }
}

function* watchForMessage() {
  yield takeEvery(DELETE_MESSAGE, fetchDeleteMessage);
}

export function* deleteMessage() {
  const channel = yield call(createChannel, socketEvents.DELETE_MESSAGE);

  while(true) {
    const { deleteMessage } = yield take(channel);
    const { messages } = yield select(state => state.chat_message);
    const newMessages = messages.filter(item => !deleteMessage.includes(item._id));

    yield put(setMessages(newMessages));
  }
}

export default watchForMessage;