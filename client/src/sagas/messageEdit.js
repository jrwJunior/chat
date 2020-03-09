import { call, takeEvery, take, put, select } from 'redux-saga/effects';

import { SAVE_EDITED_MESSAGE } from 'constans';
import { editingMessages } from 'actions/action_messages';
import { socketEvents } from 'constans/socketEvents';
import { createChannel } from './channels/channel';
import { API } from 'utils/api';

function* fetchEditedMessage() {
  const api = new API();
  const { editedMessage, id } = yield select(state => state.replyMessage);

  try {
    yield call(api.editedMessage, {
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

    yield put(editingMessages(newMessages));
  }
}

export default watchForEdit