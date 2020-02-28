import { eventChannel } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';

import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';
import { userIsOnline, userLastSeen } from 'actions/action_online';

function createChannel() {
  const subscribe = emitter => {
    socket.on(socketEvents.STATUS_ONLINE, emitter);

    return () => {
      socket.removeListener(socketEvents.STATUS_ONLINE, emitter);
    }
  }

  return eventChannel(subscribe);
}

function* connectChannel() {
  const channel = yield call(createChannel);

  while(true) {
    const data = yield take(channel);

    if (data.lastSeen) {
      yield put(userLastSeen(data.lastSeen));
    }
    
    yield put(userIsOnline(data.isOnline));
  }
}

function* mySaga() {
  yield fork(connectChannel);
}

export default mySaga;