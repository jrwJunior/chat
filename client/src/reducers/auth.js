import * as actionTypes from 'constans';

const initialState = {
  userData: {},
  error: null,
  loading: false,
  status: null,
  logoutUser: false
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
        logoutUser: false,
        status: data.status
      }
    case actionTypes.LOGIN_ERROR:
      const { error, status } = action.payload;

      return {
        ...state,
        loading: false,
        status,
        error
      }
    case actionTypes.LOG_OUT:
      return {
        ...state,
        logoutUser: true
      };
    case actionTypes.CLEAR_ERROR_USER:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}