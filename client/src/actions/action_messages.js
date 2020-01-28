import * as actionTypes from 'constans';

const getAllMessages = () => {
  return {
    type: actionTypes.MESSAGES_REQUESTED
  }
}

export {
  getAllMessages
}