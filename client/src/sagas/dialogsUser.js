import { put, call, all, take, fork } from 'redux-saga/effects';

import { DEALOGS_REQUESTED, GET_USER } from 'constans';
import { dialogsLoad } from 'actions/action_dialogs';
import { setAuthorizedUser, setUser } from 'actions/action_user';
import { APIDialogs } from 'utils/api/dialog';
import { APIUser } from 'utils/api/user';
import { userOnline } from './channels/online';

function* getUserAndDialogs() {
  try {
    const [ dialogs, user ] = yield all([
      call(new APIDialogs().getAllDialogs),
      call(new APIUser().getAuthUser)
    ]);

    yield put(setAuthorizedUser(user));
    yield put(dialogsLoad(dialogs));
    yield call(userOnline);
  } catch(err) {
    console.log(err.message);
  }
}

function* getPartnerDialog(action) {
  try {
    const { data } = yield call(new APIUser().getMyPartner, action.payload);
    yield put(setUser(data));
  } catch(err) {
    console.log(err.message);
  }
}

function* watchForDailogs() {
  while(true) {
    const action = yield take([
      DEALOGS_REQUESTED,
      GET_USER
    ]);

    if (action.type === GET_USER) {
      yield fork(getPartnerDialog, action);
    } else {
      yield fork(getUserAndDialogs);
    }
  }
};

export default watchForDailogs;