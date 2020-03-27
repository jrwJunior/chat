import * as actionTypes from 'constans';

const setDialogId = id => {
  return {
    type: actionTypes.SET_DIALOG_ID,
    payload: id
  }
}

export {
  setDialogId
}