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

const sendMessage = (message, dialogId = null, interlocutor) => {
  return {
    type: actionTypes.SEND_MESSAGE,
    payload: {
      message,
      dialogId,
      interlocutor
    }
  }
}

const getMessage = message => {
  return {
    type: actionTypes.GET_MESSAGE,
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
  sendMessage,
  getMessage,
  deleteMessage
}