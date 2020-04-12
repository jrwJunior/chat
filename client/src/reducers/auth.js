import * as actionTypes from 'constans';

const initialState = {
  authorizedUser: {},
  loading: false,
  status: null,
  logoutUser: false,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_REQUESTED:
    case actionTypes.REGISTER_REQUESTED:
    case actionTypes.GET_AUTHORIZED_USER:
      return {
        ...state,
        loading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      const { data } = action.payload;

      return {
        authorizedUser: {
          ...data
        },
        loading: false,
        status: data.status,
        error: null,
      }
    case actionTypes.SET_AUTHORIZED_USER:
      return {
        ...state,
        loading: false,
        authorizedUser: {
          ...action.payload
        }
      }
    case actionTypes.LOGIN_ERROR:
      const { error, status } = action.payload;

      return {
        ...state,
        status,
        error,
        loading: false
      }
    case actionTypes.LOG_OUT:
      return {
        ...state,
        authorizedUser: {},
        status: null,
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