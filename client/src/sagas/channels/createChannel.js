import { eventChannel } from 'redux-saga';
import { fork, all } from 'redux-saga/effects';

import { socket } from 'utils/socket';
import * as connectedChannels from './connect';

export function createChannel(socketEvent, params) {
  const subscribe = emitter => {
    socket.on(socketEvent, emitter);
    
    if (params) {
      socket.emit(socketEvent, params);
    }

    return () => {
      socket.removeListener(socketEvent, emitter);
    }
  }

  return eventChannel(subscribe);
}

function* mySaga() {
  yield all([
    ...Object.values(connectedChannels)
  ].map(fork));
}

export default mySaga;