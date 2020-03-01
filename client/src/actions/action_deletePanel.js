import * as actionTypes from 'constans';

const openDeletePanel = param => {
  return {
    type: actionTypes.TOGGLE_DELETE_PANEL,
    payload: param
  }
}

export {
  openDeletePanel
}