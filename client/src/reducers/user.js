import * as actionTypes from 'constans';

const initialState = {
  user: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_USER:
      return {
        user: action.payload
      }
    default:
      return state;
  }
}