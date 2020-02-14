import { eventChannel } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';
import { getMessage } from 'actions/action_messages';
import { setDialog } from 'actions/action_dialogs';

function createChannel() {
  const subscribe = emitter => {
    socket.on(socketEvents.DIALOG_RECEIVED, emitter);
    socket.on(socketEvents.MESSAGE_RECEIVED, emitter);

    return () => {
      socket.removeListener(socketEvents.DIALOG_RECEIVED, emitter);
      socket.removeListener(socketEvents.MESSAGE_RECEIVED, emitter);
    }
  }

  return eventChannel(subscribe);
}

function* connectChannel() {
  const channel = yield call(createChannel);

  while(true) {
    const data = yield take(channel);

    if (Array.isArray(data)) {
      yield put(setDialog(data));
    } else {
      yield put(getMessage(data));
    }
  }
}

function* run() {
  yield fork(connectChannel);
}

export default run;