import { take, call, put } from 'redux-saga/effects';

import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';
import { userIsOnline, userLastSeen } from 'actions/action_online';

export function* onlineStatus() {
  const channel = yield call(createChannel, socketEvents.STATUS_ONLINE);

  while(true) {
    const { isOnline, lastSeen } = yield take(channel);
    yield put(userIsOnline(isOnline));
    
    if (lastSeen) {
      yield put(userLastSeen(lastSeen));
    }
  }
}

// function* connectChannel() {
//   const channel = yield call(createChannel);

//   while(true) {
//     const data = yield take(channel);

//     if (data.lastSeen) {
//       yield put(userLastSeen(data.lastSeen));
//     }
    
//     yield put(userIsOnline(data.isOnline));
//   }
// }