import * as actionTypes from 'constans';

const getUserData = () => {
  return {
    type: actionTypes.GET_USER_DATA
  }
}

const setUserData = data => {
  return {
    type: actionTypes.SET_USER_DATA,
    payload: data
  }
}

export {
  getUserData,
  setUserData
}