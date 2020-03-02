import * as actionTypes from 'constans';

const setDialogId = id => {
  return {
    type: actionTypes.SET_DIALOG_ID,
    payload: id
  }
}

const setDialogPartner = partner => {
  return {
    type: actionTypes.SET_DIALOG_PARTNER,
    payload: partner
  }
}

export {
  setDialogId,
  setDialogPartner
}