import { call, take, put, select, takeEvery } from 'redux-saga/effects';

import { DELETE_MESSAGE } from 'constans';
import { setMessages } from 'actions/action_messages';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';
import { APIMsg } from 'utils/api/msg';

function* fetchDeleteMessage(action) {
  const { dialogId } = yield select(state => state.dialog);

  try {
    yield call(new APIMsg().removeMessage, {dialogId, messages: action.payload});
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