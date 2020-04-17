import * as actionTypes from 'constans';

const initialState = {
  userOnline: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_ONLINE:
      return {
        userOnline: action.payload
      }
    default:
      return state;
  }
}