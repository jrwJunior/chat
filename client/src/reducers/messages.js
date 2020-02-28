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
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      }
    case actionTypes.DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(item => item._id !== action.payload)
      }
    default:
      return state;
  }
}