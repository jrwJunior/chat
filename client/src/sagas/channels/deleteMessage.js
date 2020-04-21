import { call, take, put, select } from 'redux-saga/effects';

import { setMessages } from 'actions/action_messages';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';

export function* deleteMessage() {
  const channel = yield call(createChannel, socketEvents.DELETE_MESSAGE);

  while(true) {
    const { deleteMessage } = yield take(channel);
    const { messages } = yield select(state => state.chat_message);
    const newMessages = messages.filter(item => !deleteMessage.includes(item._id));

    yield put(setMessages(newMessages));
  }
}