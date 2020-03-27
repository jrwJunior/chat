import { put, call, take } from 'redux-saga/effects';

import { setDialog } from 'actions/action_dialogs';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';

export function* dialogReceived() {
  const channel = yield call(createChannel, socketEvents.DIALOG_RECEIVED);

  while(true) {
    const { dialog } = yield take(channel);
    yield put(setDialog(dialog));
  }
}