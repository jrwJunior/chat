import { call, select } from 'redux-saga/effects';

import { APIUploadFile } from 'utils/api/uploadFile';

function* uploadFile() {
  try {
    const { file } = yield select(state => state.attachmentFile);
    yield call(new APIUploadFile().uploadAvatar, file);

  } catch(err) {
    console.log(err.message);
  }
}

export default uploadFile;