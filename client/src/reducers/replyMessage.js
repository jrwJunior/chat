import * as actionTypes from 'constans';

const initialState = {
  replyMessage: {},
  isOpen: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_REPLY_MESSAGE:
      return {
        isOpen: true,
        replyMessage: {
          message: action.payload
        }
      }
    case actionTypes.CLOSE_REPLY_MESSAGE:
      return {
        replyMessage: {},
        isOpen: false
      }
    default:
      return state;
  }
}