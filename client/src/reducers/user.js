import * as actionTypes from 'constans';

const initialState = {
  user: {},
  loading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    default:
      return state;
  }
}