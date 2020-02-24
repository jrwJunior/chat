import * as actionTypes from 'constans';

const initialState = {
  dialogs: [],
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
        loading: false
      }
    case actionTypes.SET_LAST_MESSAGE:
      return {
        ...state,
        dialogs: [
          action.payload
        ]
      }
    case actionTypes.SET_DIALOG:
      return {
        ...state,
        dialogs: [
          action.payload
        ]
      }
    default:
      return state;
  }
}