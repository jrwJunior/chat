import * as actionTypes from 'constans';

const initialState = {
  message: '',
  editedMessage: '',
  id: null,
  isOpenPanel: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.EDIT_MESSAGE:
      const { message, id } = action.payload;
      
      return {
        isOpenPanel: true,
        message,
        id
      }
    case actionTypes.CLOSE_REPLY_MESSAGE:
      return {
        message: null,
        id: null,
        isOpenPanel: false
      }

    case actionTypes.SAVE_EDITED_MESSAGE:
      return {
        ...state,
        editedMessage: action.payload,
        isOpenPanel: false
      }
    default:
      return state;
  }
}