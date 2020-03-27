import { take, call, put } from 'redux-saga/effects';

import { notifBadge } from 'actions/action_badge'
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';

export function* messageNoRead() {
  const channel = yield call(createChannel, socketEvents.MESSAGES_NO_READ);

  while(true) {
    const data = yield take(channel);
    yield put(notifBadge(data));
  }
}