import { take, call, put, select, all } from 'redux-saga/effects';

import { setMessage, editingMessages } from 'actions/action_messages';
import { setLastMessageReceived } from 'actions/action_dialogs';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './channel';

export function* messageReceived() {
  const { messageChannel, lastMessageChannel } = yield all({
    messageChannel: call(createChannel, socketEvents.MESSAGE_RECEIVED),
    lastMessageChannel: call(createChannel, socketEvents.LAST_MESSAGE)
  });

  while(true) {
    const { message } = yield take(messageChannel);
    const { lastMessage } = yield take(lastMessageChannel);

    yield put(setMessage(message));

    const { dialogs } = yield select(state => state.chatDialogs);
    const item = dialogs.find(item => item._id === lastMessage.dialog);
  
    if (item.lastMessage._id !== lastMessage._id) {
      item.lastMessage = lastMessage;
      yield put(setLastMessageReceived(item));
    }
  }
}

export function* messageEdited() {
  const channel = yield call(createChannel, socketEvents.MESSAGE_EDITING);

  while(true) {
    const { editedMessage } = yield take(channel);
    const { messages } = yield select(state => state.chat_message);

    const newMessages = messages.map(item => {
      if (item._id === editedMessage._id) {
        return { ...item, ...editedMessage };
      }

      return item;
    });

    yield put(editingMessages(newMessages));
  }
}