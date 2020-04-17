import * as actionTypes from 'constans';

const typingMessage = data => {
  return {
    type: actionTypes.TYPING_MESSAGE,
    payload: data
  }
}

export {
  typingMessage
}