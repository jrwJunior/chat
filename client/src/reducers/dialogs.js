import * as actionTypes from 'constans';

const initialState = {
  dialogs: [],
  dialogId: null,
  loading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.DEALOGS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.DIALOGS_LOAD_SUCCESS:
      return {
        dialogs: action.payload,
        dialogId: null,
        loading: false
      }
    case actionTypes.DIALOG_ID:
      return {
        ...state,
        dialogId: action.payload
      }
    default:
      return state;
  }
}