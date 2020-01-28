import * as actionTypes from 'constans';

const getAllDialogs = () => {
  return {
    type: actionTypes.DEALOGS_REQUESTED
  }
}

const getDialogId = id => {
  return {
    type: actionTypes.DIALOG_ID,
    payload: id
  }
}

export {
  getAllDialogs,
  getDialogId
}