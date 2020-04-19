import { take, call, put } from 'redux-saga/effects';

import { setReadedMessages } from 'actions/action_messages';
import { setReadedLastMessage } from 'actions/action_dialogs';
import { deleteNotifBadge } from 'actions/action_badge';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';

export function* readedMessages() {
  const channel = yield call(createChannel, socketEvents.MESSAGES_READED);

  while(true) {
    const data = yield take(channel);

    yield put(setReadedMessages(data));
    yield put(setReadedLastMessage(data));
    yield put(deleteNotifBadge(data.dialogId));
  }
}