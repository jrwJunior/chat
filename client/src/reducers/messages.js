import * as actionTypes from 'constans';

const initialState = {
  messages: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.MESSAGES_REQUESTED:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.MESSAGES_LOAD_SUCCESS:
      return {
        isLoading: false,
        messages: action.payload
      }
    default:
      return state;
  }
}