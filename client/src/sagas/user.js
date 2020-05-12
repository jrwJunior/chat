import { put, call, take, fork } from 'redux-saga/effects';

import { GET_USER } from 'constans';
import { APIUser } from 'utils/api/user';
import { setUserDialog } from 'actions/action_user';

function* getUserDialog(action) {
  try {
    const { data } = yield call(new APIUser().getMyPartner, action.payload);
    yield put(setUserDialog(data));
  } catch(err) {
    console.log(err.message);
  }
}

function* watchForDailogs() {
  while(true) {
    const action = yield take(GET_USER);
    yield fork(getUserDialog, action);
  }
};

export default watchForDailogs;