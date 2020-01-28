import { all } from 'redux-saga/effects';

import fetchDialogs from './dialogs';
import fetchMessages from './messages';

export default function* rootSaga() {
  yield all([
    fetchDialogs(),
    fetchMessages()
  ]);
}