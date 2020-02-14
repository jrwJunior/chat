import { put, call, take, fork, cancel } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { loadMessages } from 'actions/action_messages';
import { API } from 'utils/api';

const api = new API();

function* fetchRemoveMessage(action) {
  try {
    yield call(api.removeMessage, action.payload);
  } catch(err) {
    console.log(err.message);
  }
}

function* fetchMessage(action) {
  try {
    yield call(api.createMessage, action.payload);
  } catch(err) {
    console.log(err.message);
  }
}

function* fetchAllMessages(action) {
  try {
    const { data } = yield call(api.getMessages, action.payload);

    yield put(loadMessages(data));
  } catch(err) {
    console.log(err.message);
  }
}

function* watchForMessages() {
  const sagas = [
    fetchAllMessages,
    fetchMessage,
    fetchRemoveMessage
  ];
  let task;

  while(true) {
    const action = yield take([
      actionTypes.MESSAGES_REQUESTED,
      actionTypes.SEND_MESSAGE,
      actionTypes.DELETE_MESSAGE
    ]);

    yield sagas.map(saga => {
      if (task) {
        yield cancel(task);
      }

      task = fork(saga, action);
    });
  }
}

export default watchForMessages;