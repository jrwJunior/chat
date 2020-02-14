import * as actionTypes from 'constans';

const getAllDialogs = () => {
  return {
    type: actionTypes.DEALOGS_REQUESTED
  }
}

const dialogsLoad = data => {
  return {
    type: actionTypes.DIALOGS_LOAD_SUCCESS,
    payload: data
  }
}

const setDialog = dialog => {
  return {
    type: actionTypes.SET_DIALOG,
    payload: dialog
  }
}

export {
  getAllDialogs,
  dialogsLoad,
  setDialog
}