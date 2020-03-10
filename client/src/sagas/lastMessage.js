import { take, call, put, select } from 'redux-saga/effects';

import { setLastMessageReceived } from 'actions/action_dialogs';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';

export function* lastMessageReceived() {
  const channel = yield call(createChannel, socketEvents.LAST_MESSAGE);

  while(true) {
    const { lastMessage } = yield take(channel);

    const { dialogs } = yield select(state => state.chatDialogs);
    const item = dialogs.find(item => item._id === lastMessage.dialog);
  
    if (item.lastMessage._id !== lastMessage._id) {
      item.lastMessage = lastMessage;
      yield put(setLastMessageReceived(item));
    }
  }
}