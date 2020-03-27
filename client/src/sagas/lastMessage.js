import { take, call, put } from 'redux-saga/effects';

import { setLastMessage } from 'actions/action_dialogs';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';

export function* lastMessageReceived() {
  const channel = yield call(createChannel, socketEvents.LAST_MESSAGE);

  while(true) {
    const { lastMessage } = yield take(channel);
    yield put(setLastMessage(lastMessage));
  }
}