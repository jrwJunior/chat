import { put, call, take, fork } from 'redux-saga/effects';

import { MESSAGES_REQUESTED, CREATED_MESSAGE, DELETE_MESSAGE } from 'constans';
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
  while(true) {
    const action = yield take([
      MESSAGES_REQUESTED,
      CREATED_MESSAGE,
      DELETE_MESSAGE
    ]);

    switch(action.type) {
      case MESSAGES_REQUESTED:
        yield fork(fetchAllMessages, action);
        break;
      case CREATED_MESSAGE:
        yield fork(fetchMessage, action);
        break;
      default:
        yield fork(fetchRemoveMessage, action);
    }
  }
}

export default watchForMessages;