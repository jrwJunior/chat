import { call, take, put, delay, select } from 'redux-saga/effects';

import { setMessage, setMessages } from 'actions/action_messages';
import { notifBadge } from 'actions/action_badge';
import { typingMessage } from 'actions/action_typing';
import { setReadedMessages } from 'actions/action_messages';
import { setReadedLastMessage } from 'actions/action_dialogs';
import { deleteNotifBadge } from 'actions/action_badge';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';

export function* messageReceived() {
  const channel = yield call(createChannel, socketEvents.MESSAGE_RECEIVED);

  while(true) {
    const { message } = yield take(channel);
    yield put(setMessage(message));
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

    yield put(setMessages(newMessages));
  }
}

export function* messageTyping() {
  const channel = yield call(createChannel, socketEvents.TYPING_MESSAGE);

  while(true) {
    const { typing, dialogId } = yield take(channel);

    yield put(typingMessage({typing, dialogId}));
    yield delay(3000);
    yield put(typingMessage(false));
  }
}

export function* messageNoRead() {
  const channel = yield call(createChannel, socketEvents.MESSAGES_NO_READ);

  while(true) {
    const data = yield take(channel);
    yield put(notifBadge(data));
  }
}

export function* readedMessages() {
  const channel = yield call(createChannel, socketEvents.MESSAGES_READED);

  while(true) {
    const data = yield take(channel);

    yield put(setReadedMessages(data));
    yield put(setReadedLastMessage(data));
    yield put(deleteNotifBadge(data.dialogId));
  }
}