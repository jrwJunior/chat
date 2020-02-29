import { eventChannel } from 'redux-saga';
import { take, call, put, fork, delay } from 'redux-saga/effects';

import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';
import { setMessage } from 'actions/action_messages';
import { typingMessage } from 'actions/action_typing';

function createChannel() {
  const subscribe = emitter => {
    socket.on(socketEvents.MESSAGE_RECEIVED, emitter);
    socket.on(socketEvents.TYPING_MESSAGE, emitter);

    return () => {
      socket.removeListener(socketEvents.MESSAGE_RECEIVED, emitter);
      socket.removeListener(socketEvents.TYPING_MESSAGE, emitter);
    }
  }

  return eventChannel(subscribe);
}

function* connectChannel() {
  const channel = yield call(createChannel);

  while(true) {
    const data = yield take(channel);

    if (data.message) {
      yield put(setMessage(data.message));
    }

    if (!data.message) {
      yield put(typingMessage(data.typing));
      yield delay(3000);
      yield put(typingMessage());
    }
  }
}

function* mySaga() {
  yield fork(connectChannel);
}

export default mySaga;