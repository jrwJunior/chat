import * as actionTypes from 'constans';

const initialState = {
  typing: false,
  senderUserId: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.TYPING_MESSAGE:
      const { typing, dialogId } = action.payload;

      return {
        typing,
        senderUserId: dialogId
      }
    default:
      return state;
  }
}