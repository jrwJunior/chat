import * as actionTypes from 'constans';

const getAuthorizedUser = () => {
  return {
    type: actionTypes.GET_AUTHORIZED_USER
  }
}

const setAuthorizedUser = data => {
  return {
    type: actionTypes.SET_AUTHORIZED_USER,
    payload: data
  }
}

export {
  getAuthorizedUser,
  setAuthorizedUser
}