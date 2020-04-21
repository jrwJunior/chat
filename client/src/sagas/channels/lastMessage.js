import { take, call, put, select } from 'redux-saga/effects';

import { setLastMessage } from 'actions/action_dialogs';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel'

export function* lastMessageReceived() {
  const channel = yield call(createChannel, socketEvents.LAST_MESSAGE);

  while(true) {
    const { lastMessage, dialogId } = yield take(channel);
    const { dialogs } = yield select(state => state.chatDialogs);

    const newData = dialogs.map(item => {
      if (item._id === dialogId) {
        item.lastMessage = lastMessage;
      }

      return item;
    });

    yield put(setLastMessage(newData));
  }
}