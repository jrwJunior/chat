import { put, call, takeLatest } from 'redux-saga/effects';

import * as actionTypes from 'constans';
import { setFoundUsers } from 'actions/action_contacs';
import { API } from 'utils/api';

const api = new API();

function* fetchFindContacts(action) {
  try {
    const { data } = yield call(api.searchForUsers, action.payload);

    yield put(setFoundUsers(data));
  } catch(err) {
    console.log(err.message);
  }
}

function* watchForContacts() {
  yield takeLatest(actionTypes.CONTACTS_REQUESTED, fetchFindContacts);
}

export default watchForContacts;