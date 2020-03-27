import * as actionTypes from 'constans';

const initialState = {
  count: 0
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.NOTIF_BADGE:
      const { unread } = action.payload;

      return {
        count: unread
      }
    case actionTypes.DELETE_NOTIF_BADGE:
      return initialState;
    default:
      return state;
  }
}