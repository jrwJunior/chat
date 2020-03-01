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

const setDialogId = id => {
  return {
    type: actionTypes.SET_DIALOG_ID,
    payload: id
  }
} 

const setLastMessageChat = message => {
  return {
    type: actionTypes.SET_LAST_MESSAGE,
    payload: message
  }
}

export {
  getAllDialogs,
  dialogsLoad,
  setDialog,
  setDialogId,
  setLastMessageChat
}