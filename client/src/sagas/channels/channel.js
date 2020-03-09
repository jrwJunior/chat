import { eventChannel } from 'redux-saga';
import { fork, all } from 'redux-saga/effects';

import { socket } from 'utils/socket';
import * as messages from './messages';

export function createChannel(socketEvent) {
  const subscribe = emitter => {
    socket.on(socketEvent, emitter);

    return () => {
      socket.removeListener(socketEvent, emitter);
    }
  }

  return eventChannel(subscribe);
}

function* mySaga() {
  yield all([
    ...Object.values(messages)
  ].map(fork));
}

export default mySaga;