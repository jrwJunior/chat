import { put, call, all, takeEvery } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { setUserData } from 'actions/action_user';
import { dialogsLoad } from 'actions/action_dialogs';
import { API } from 'utils/api';

function* fetchChatUsers() {
  const api = new API();

  try {
    const { user, dialogs } = yield all({
      user: call(api.getUser),
      dialogs: call(api.getAllDialogs)
    });

    yield put(setUserData(user));
    yield put(dialogsLoad(dialogs));
  } catch(err) {
    console.log(err.message);
  }
}

function* watchForDialogs() {
  yield takeEvery(actionTypes.DEALOGS_REQUESTED, fetchChatUsers);
}

export default watchForDialogs;