import { put, call, all, take, fork } from 'redux-saga/effects';

import { DEALOGS_REQUESTED } from 'constans';
import { dialogsLoad } from 'actions/action_dialogs';
import { setAuthorizedUser } from 'actions/action_user';
import { logOut } from 'actions/action_auth';
import { APIDialogs } from 'utils/api/dialog';
import { APIUser } from 'utils/api/user';
import { userOnline } from './channels/online';

function* getDialogsAndAuthUser() {
  try {
    const [ dialogs, user ] = yield all([
      call(new APIDialogs().getAllDialogs),
      call(new APIUser().getAuthUser)
    ]);

    yield put(setAuthorizedUser(user));
    yield put(dialogsLoad(dialogs));
    yield call(userOnline);
  } catch(err) {
    const { message } = JSON.parse(err.message);
    
    if (message === 'Invalid Token') {
      yield put(logOut());
    }
  }
}

function* watchForDailogs() {
  while(true) {
    yield take(DEALOGS_REQUESTED);
    yield fork(getDialogsAndAuthUser);
  }
};

export default watchForDailogs;