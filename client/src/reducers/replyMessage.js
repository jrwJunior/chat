import * as actionTypes from 'constans';

const initialState = {
  author: null,
  message: '',
  editedMessage: '',
  id: null,
  editing: false,
  showReply: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.EDIT_MESSAGE:
      const { message, id, author, editing } = action.payload;
      
      return {
        author,
        message,
        id,
        editing,
        showReply: true
      }
    case actionTypes.CLOSE_REPLY_MESSAGE:
      return {
        author: null,
        message: null,
        id: null,
        editing: false,
        showReply: false
      }

    case actionTypes.SAVE_EDITED_MESSAGE:
      return {
        ...state,
        editedMessage: action.payload,
        showReply: false
      }
    default:
      return state;
  }
}