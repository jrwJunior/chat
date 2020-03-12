import { call, take, put, delay, takeEvery } from 'redux-saga/effects';

import { CREATED_MESSAGE } from 'constans';
import { setMessage } from 'actions/action_messages';
import { typingMessage } from 'actions/action_typing';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';
import { API } from 'utils/api';

function* fetchMessage(action) {
  const api = new API();

  try {
    yield call(api.createMessage, action.payload);
  } catch(err) {
    console.log(err.message); // implement error handling
  }
}

function* watchForMessage() {
  yield takeEvery(CREATED_MESSAGE, fetchMessage);
}

export function* messageReceived() {
  const channel = yield call(createChannel, socketEvents.MESSAGE_RECEIVED);

  while(true) {
    const { message } = yield take(channel);
    yield put(setMessage(message));
  }
}

export function* messageTyping() {
  const channel = yield call(createChannel, socketEvents.TYPING_MESSAGE);

  while(true) {
    const { typing } = yield take(channel);

    yield put(typingMessage(typing));
    yield delay(3000);
    yield put(typingMessage(false));
  }
}

export default watchForMessage;