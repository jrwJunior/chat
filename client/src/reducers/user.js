import * as actionTypes from 'constans';

const initialState = {
  userData: {},
  error: null,
  isLoading: false,
  status: null,
  token: localStorage['_token']
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_REQUESTED:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      const { data, token } = action.payload;
      return {
        userData: data,
        error: null,
        isLoading: false,
        status: data.status,
        token
      }
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      }
    case actionTypes.LOGIN_ERROR:
      const { error } = action.payload;

      return {
        ...state,
        isLoading: false,
        token: null,
        error
      }
    case actionTypes.CLEAR_ERROR_USER:
      return initialState;
    default:
      return state;
  }
}