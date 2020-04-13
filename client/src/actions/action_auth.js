import * as actionTypes from 'constans';

const login = data => {
  return {
    type: actionTypes.LOGIN_REQUESTED,
    payload: data
  }
}

const setLoginData = data => {

  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      ...data
    }
  }
}

const setLoginError = data => {
  return {
    type: actionTypes.LOGIN_ERROR,
    payload: data
  }
}

const createAccount = data => {
  return {
    type: actionTypes.REGISTER_REQUESTED,
    payload: {
      ...data
    }
  }
}

const logOut = () => {
  return {
    type: actionTypes.LOG_OUT
  }
}

const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR_USER
  }
}

export {
  login,
  setLoginData,
  setLoginError,
  createAccount,
  logOut,
  clearError
}