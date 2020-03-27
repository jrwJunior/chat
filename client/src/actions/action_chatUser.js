import * as actionTypes from 'constans';

const chatUser = user => {
  return {
    type: actionTypes.GET_CHAT_USER,
    payload: user
  }
}

export {
  chatUser
}