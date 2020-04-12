import * as actionTypes from 'constans';

const attachment = file => {
  return {
    type: actionTypes.SET_ATTACHMENT_FILE,
    payload: file
  }
}

export {
  attachment
}