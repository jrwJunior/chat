import { take, call, put } from 'redux-saga/effects';

import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';
import { userIsOnline } from 'actions/action_online';

export function* onlineStatus() {
  const channel = yield call(createChannel, socketEvents.AUTH_USER);

  while(true) {
    const { users } = yield take(channel);
    yield put(userIsOnline(users));
  }
}