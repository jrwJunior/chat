import * as actionTypes from 'constans';

const initialState = {
  messages: [],
  deletedMessages: [],
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
    case actionTypes.EDITING_MESSAGES:
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
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      }
    case actionTypes.SELECT_MESSAGE:
      const { deletedMessages } = state;

      if (!deletedMessages.includes(action.payload) && action.payload) {
        return {
          ...state,
          deletedMessages: [
            ...deletedMessages,
            action.payload
          ]
        }
      }

      return {
        ...state,
        // eslint-disable-next-line
        deletedMessages: deletedMessages.filter(item => {
          if (item.indexOf(action.payload) < 0) {
            return action.payload;
          }
        })
      }
    case actionTypes.DELETE_MESSAGE:
      return {
        ...state,
        deletedMessages: [],
        messages: state.messages.filter(item => item._id !== action.payload)
      }
    default:
      return state;
  }
}