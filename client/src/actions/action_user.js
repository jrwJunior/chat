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

const getUser = id => {
  return {
    type: actionTypes.GET_USER,
    payload: id
  }
}

const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: user
  }
}

export {
  getAuthorizedUser,
  setAuthorizedUser,
  getUser,
  setUser
}