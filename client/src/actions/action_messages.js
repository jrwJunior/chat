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

const editingMessages = editingMessages => {
  return {
    type: actionTypes.EDITING_MESSAGES,
    payload: editingMessages
  }
}

const deleteMessage = () => {
  return {
    type: actionTypes.DELETE_MESSAGE
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
  editingMessages,
  deleteMessage,
  flaggedMessage
}