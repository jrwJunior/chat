import * as actionTypes from 'constans';

const initialState = {
  messages: [],
  selectedMessages: [],
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
        ...state,
        isLoading: false,
        messages: action.payload
      }
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      }
    case actionTypes.SELECT_MESSAGE:
      const { selectedMessages } = state;

      if (!selectedMessages.includes(action.payload) && action.payload) {
        return {
          ...state,
          selectedMessages: [
            ...state.selectedMessages,
            action.payload
          ]
        }
      }

      return {
        ...state,
        // eslint-disable-next-line
        selectedMessages: selectedMessages.filter(item => {
          if (item.indexOf( action.payload) < 0) {
            return action.payload;
          }
        })
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