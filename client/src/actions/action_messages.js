import * as actionTypes from 'constans';

const getAllMessages = data => {
  return {
    type: actionTypes.MESSAGES_REQUESTED,
    payload: {
      ...data
    }
  }
}

const loadMessages = messages => {
  return {
    type: actionTypes.MESSAGES_LOAD_SUCCESS,
    payload: messages
  }
}

const createdMessage = (message, dialogId = null, interlocutor) => {
  return {
    type: actionTypes.CREATED_MESSAGE,
    payload: {
      message,
      dialogId,
      interlocutor
    }
  }
}

const setMessage = message => {
  return {
    type: actionTypes.SET_MESSAGE,
    payload: message
  }
}

const deleteMessage = messageId => {
  return {
    type: actionTypes.DELETE_MESSAGE,
    payload: messageId
  }
};

export {
  getAllMessages,
  loadMessages,
  createdMessage,
  setMessage,
  deleteMessage
}