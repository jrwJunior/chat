import { call, takeEvery,select } from 'redux-saga/effects';

import { SAVE_EDITED_MESSAGE } from 'constans';
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

export default watchForEdit