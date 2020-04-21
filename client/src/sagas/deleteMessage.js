import { call, select, takeEvery } from 'redux-saga/effects';

import { DELETE_MESSAGE } from 'constans';
import { APIMsg } from 'utils/api/msg';

function* fetchDeleteMessage(action) {
  const { dialogId } = yield select(state => state.dialog);

  try {
    yield call(new APIMsg().removeMessage, {dialogId, messages: action.payload});
  } catch(err) {
    console.log(err.message); // implement error handling
  }
}

function* watchForMessage() {
  yield takeEvery(DELETE_MESSAGE, fetchDeleteMessage);
}

export default watchForMessage;