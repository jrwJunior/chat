import * as actionTypes from 'constans';

const replyMessage = message => {
  return {
    type: actionTypes.SET_REPLY_MESSAGE,
    payload: message
  }
}

const closeReplyMessage = () => {
  return {
    type: actionTypes.CLOSE_REPLY_MESSAGE
  }
}

export {
  replyMessage,
  closeReplyMessage
}