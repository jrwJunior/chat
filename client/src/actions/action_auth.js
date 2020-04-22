import * as actionTypes from 'constans';
import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';

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

const logOut = id => {
  socket.emit(socketEvents.USER_LOG_OUT, id);
  
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