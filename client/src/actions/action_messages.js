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

const setMessages = messages => {
  return {
    type: actionTypes.SET_MESSAGES,
    payload: messages
  }
}

const deleteMessage = (messages, dialogId) => {
  return {
    type: actionTypes.DELETE_MESSAGE,
    payload: {
      messages,
      dialogId
    }
  }
};

const flaggedMessage = msgId => {
  return {
    type: actionTypes.SELECT_MESSAGE,
    payload: msgId
  }
}

export {
  getAllMessages,
  loadMessages,
  createdMessage,
  setMessage,
  setMessages,
  deleteMessage,
  flaggedMessage
}