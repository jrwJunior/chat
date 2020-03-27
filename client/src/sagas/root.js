import { put, call, all, takeEvery } from 'redux-saga/effects';

import { DEALOGS_REQUESTED } from 'constans';
import { dialogsLoad } from 'actions/action_dialogs';
import { setAuthorizedUser } from 'actions/action_user';
import { API } from 'utils/api';
function* root() {
  const api = new API();
  
  const [ dialogs, user ] = yield all([
    call(api.getAllDialogs),
    call(api.getUser)
  ]);

  yield put(setAuthorizedUser(user));
  yield put(dialogsLoad(dialogs));
}

function* watchForDailogs() {
  yield takeEvery(DEALOGS_REQUESTED, root);
};

export default watchForDailogs;