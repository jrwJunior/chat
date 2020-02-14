import * as actionTypes from 'constans';

const initialState = {
  contacts: [],
  loading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.CONTACTS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SET_FOUND_CONTACTS:
      return {
        contacts: action.payload,
        loading: false
      }
    case actionTypes.CONTACTS_NOT_FOUND:
      return initialState;
    default:
      return state;
  }
}