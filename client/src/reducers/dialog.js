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
    default:
      return state;
  }
}