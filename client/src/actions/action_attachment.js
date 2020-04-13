import * as actionTypes from 'constans';

const attachmentRequest = file => {
  return {
    type: actionTypes.FILE_REQUESTED,
    payload: file
  }
}

const attachmentLoadSuccess = () => {
  return {
    type: actionTypes.FILE_SUCCESSFULLY_UPLOADED
  }
}

export {
  attachmentRequest,
  attachmentLoadSuccess
}