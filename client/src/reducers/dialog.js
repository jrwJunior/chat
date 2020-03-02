import * as actionTypes from 'constans';

const initialState = {
  dialogId: null,
  dialogPartner: {}
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_DIALOG_ID:
      return {
        ...state,
        dialogId: action.payload
      }
    case actionTypes.SET_DIALOG_PARTNER:
      return {
        ...state,
        dialogPartner: {
          ...action.payload
        }
      }
    default:
      return state;
  }
}