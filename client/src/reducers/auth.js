import * as actionTypes from 'constans';

const initialState = {
  userData: {},
  error: null,
  loading: false,
  status: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      const { data } = action.payload;

      return {
        userData: data,
        error: null,
        loading: false,
        status: data.status
      }
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        loading: false,
        userData: action.payload
      }
    case actionTypes.LOGIN_ERROR:
      const { error } = action.payload;

      return {
        ...state,
        loading: false,
        error
      }
    case actionTypes.CLEAR_ERROR_USER:
      return initialState;
    default:
      return state;
  }
}