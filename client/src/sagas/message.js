import { call, take, put, takeEvery } from 'redux-saga/effects';

import { CREATED_MESSAGE } from 'constans';
import { setMessage } from 'actions/action_messages';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './channels/channel';
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

export default watchForMessage;