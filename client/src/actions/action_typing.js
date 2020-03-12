import * as actionTypes from 'constans';

const typingMessage = typing => {
  return {
    type: actionTypes.TYPING_MESSAGE,
    payload: typing
  }
}

export {
  typingMessage
}