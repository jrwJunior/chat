import { call, takeEvery, take, put, select } from 'redux-saga/effects';

import { SAVE_EDITED_MESSAGE } from 'constans';
import { setMessages } from 'actions/action_messages';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './createChannel';
import { APIMsg } from 'utils/api/msg';

function* fetchEditedMessage() {
  const { editedMessage, id } = yield select(state => state.replyMessage);

  try {
    yield call(new APIMsg().editedMessage, {
      message: editedMessage, 
      id
    });
  } catch(err) {
    console.log(err.message); // implement error handling
  }
}

function* watchForEdit() {
  yield takeEvery(SAVE_EDITED_MESSAGE, fetchEditedMessage);
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

export default watchForEdit