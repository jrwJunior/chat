import { take, call, put, select } from 'redux-saga/effects';

import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';
import { userIsOnline } from 'actions/action_online';

export function* userOnline() {
  const { authorizedUser } = yield select(state => state.authUser);
  const channel = yield call(createChannel, socketEvents.AUTH_USER, authorizedUser._id);

  while(true) {
    const { users } = yield take(channel);
    yield put(userIsOnline(users));
  }
}