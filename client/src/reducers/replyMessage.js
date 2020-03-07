import * as actionTypes from 'constans';

const initialState = {
  message: null,
  isOpenPanel: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_REPLY_MESSAGE:
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