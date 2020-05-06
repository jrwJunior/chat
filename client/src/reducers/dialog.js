import * as actionTypes from 'constans';

const initialState = {
  dialogId: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_DIALOG_ID:
      return {
        dialogId: action.payload
      }
    case actionTypes.DELETE_DIALOG_ID:
      return {
        dialogId: null
      }
    default:
      return state;
  }
}