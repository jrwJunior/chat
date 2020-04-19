import * as actionTypes from 'constans';

const initialState = {
  unreadMessages: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.NOTIF_BADGE:
      const { unread, dialogId } = action.payload;

      return {
        unreadMessages: state.unreadMessages.concat({
          count: unread,
          id: dialogId
        })
      }
    case actionTypes.DELETE_NOTIF_BADGE:
      return {
        unreadMessages: state.unreadMessages.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
}