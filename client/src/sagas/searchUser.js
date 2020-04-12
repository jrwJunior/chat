import { put, call, takeLatest } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { setFoundUsers } from 'actions/action_contacs';
import { APIUser } from 'utils/api/user';

function* fetchFindContacts(action) {
  try {
    const { data } = yield call(new APIUser().searchUsers, action.payload);

    yield put(setFoundUsers(data));
  } catch(err) {
    console.log(err.message);
  }
}

function* watchForContacts() {
  yield takeLatest(actionTypes.CONTACTS_REQUESTED, fetchFindContacts);
}

export default watchForContacts;