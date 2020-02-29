import * as actionTypes from 'constans';

const openPanelEdit = param => {
  return {
    type: actionTypes.OPEN_PANEL_EDIT,
    payload: param
  }
}

export {
  openPanelEdit
}