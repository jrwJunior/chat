import * as actionTypes from 'constans';

const initialState = {
  file: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_ATTACHMENT_FILE:
      return {
        file: action.payload
      }
    default:
      return state;
  }
}