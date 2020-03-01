import * as actionTypes from 'constans';

const setDialogPartner = partner => {
  return {
    type: actionTypes.SET_DIALOG_PARTNER,
    payload: partner
  }
}

export {
  setDialogPartner
}