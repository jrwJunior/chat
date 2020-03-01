import * as actionTypes from 'constans';

const initialState = {
  dialogPartner: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_DIALOG_PARTNER:
      return {
        dialogPartner: action.payload
      }
    default:
      return state;
  }
}