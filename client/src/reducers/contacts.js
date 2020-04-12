import * as actionTypes from 'constans';

const initialState = {
  contacts: [],
  contactId: null,
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
    case actionTypes.SET_CONTACT_ID:
      return {
        ...state,
        contactId: action.payload
      };
    case actionTypes.DELETE_SELECTED_CONTACT:
      return {
        ...state,
        contacts: []
      };
    default:
      return state;
  }
}