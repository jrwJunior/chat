import * as actionTypes from 'constans';

const setDialogId = id => {
  return {
    type: actionTypes.SET_DIALOG_ID,
    payload: id
  }
}

const deleteDialogId = () => {
  return {
    type: actionTypes.DELETE_DIALOG_ID
  }
}

export {
  setDialogId,
  deleteDialogId
}