import * as actionTypes from 'constans';

const initialState = {
  message: null,
  isOpenPanel: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_REPLY_MESSAGE:
      const equal = Object.is(state.message,action.payload);

      if (equal) {
        return state;
      }

      return {
        isOpenPanel: true,
        message: action.payload
      }
    case actionTypes.CLOSE_REPLY_MESSAGE:
      return {
        message: null,
        isOpenPanel: false
      }
    default:
      return state;
  }
}