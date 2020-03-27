import * as actionTypes from 'constans';

const initialState = {
  authorizedUser: {},
  user: {},
  loading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_AUTHORIZED_USER:
      return {
        ...state,
        authorizedUser: {
          ...action.payload
        }
      }
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