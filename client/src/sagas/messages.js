import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';

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
  yield takeEvery(actionTypes.MESSAGES_REQUESTED, fetchAllMessages);
  yield takeLatest(actionTypes.SEND_MESSAGE, fetchMessage);
  yield takeLatest(actionTypes.DELETE_MESSAGE, fetchRemoveMessage);
}

export default watchForMessages;