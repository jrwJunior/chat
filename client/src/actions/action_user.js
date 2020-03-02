import * as actionTypes from 'constans';

const setUserData = data => {
  return {
    type: actionTypes.SET_USER_DATA,
    payload: data
  }
}

export {
  setUserData
}