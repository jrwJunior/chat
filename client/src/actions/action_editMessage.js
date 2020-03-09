import * as actionTypes from 'constans';

const editMessage = data => {
  return {
    type: actionTypes.EDIT_MESSAGE,
    payload: data
  }
}

const saveMessage = text => {
  return {
    type: actionTypes.SAVE_EDITED_MESSAGE,
    payload: text
  }
}

const closeReplyMessage = () => {
  return {
    type: actionTypes.CLOSE_REPLY_MESSAGE
  }
}

export {
  editMessage,
  saveMessage,
  closeReplyMessage
}