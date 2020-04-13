import { put, call, select, takeEvery } from 'redux-saga/effects';

import { FILE_REQUESTED } from 'constans';
import { setAuthorizedUser } from 'actions/action_user';
import { attachmentLoadSuccess } from 'actions/action_attachment';
import { APIUploadFile } from 'utils/api/uploadFile';

function* uploadFile(action) {
  try {
    const { avatar } = yield call(new APIUploadFile().uploadAvatar, action.payload);
    const { authorizedUser } = yield select(state => state.authUser);
    const newData = {
      ...authorizedUser,
      avatar
    }

    yield put(attachmentLoadSuccess());
    yield put(setAuthorizedUser(newData));
  } catch(err) {
    console.log(err.message);
  }
}

function* watchUpload() {
  yield takeEvery(FILE_REQUESTED, uploadFile);
}

export default watchUpload;