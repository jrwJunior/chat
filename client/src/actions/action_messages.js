import * as actionTypes from 'constans';

const getAllMessages = () => {
  return {
    type: actionTypes.MESSAGES_REQUESTED
  }
}

const loadMessages = messages => {
  return {
    type: actionTypes.MESSAGES_LOAD_SUCCESS,
    payload: messages
  }
}

const createdMessage = (message, user, author, replyMessage) => {
  return {
    type: actionTypes.CREATED_MESSAGE,
    payload: {
      message,
      user,
      author,
      replyMessage
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

const deleteMessage = id => {
  return {
    type: actionTypes.DELETE_MESSAGE,
    payload: id
  }
};

const flaggedMessage = msgId => {
  return {
    type: actionTypes.SELECT_MESSAGE,
    payload: msgId
  }
}

const setReadedMessages = data => {
  return {
    type: actionTypes.READED_MESSAGES,
    payload: data
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
  flaggedMessage,
  setReadedMessages
}