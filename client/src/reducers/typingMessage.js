import * as actionTypes from 'constans';

const initialState = {
  typing: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.TYPING_MESSAGE:
      return {
        ...state,
        typing: action.payload
      }
    default:
      return state;
  }
}