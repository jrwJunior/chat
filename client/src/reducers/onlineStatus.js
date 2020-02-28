import * as actionTypes from 'constans';

const initialState = {
  online: false,
  lastSeen: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_ONLINE:
      return {
        ...state,
        online: action.payload
      }
    case actionTypes.SET_LAST_SEEN:
      return {
        ...state,
        lastSeen: action.payload
      }
    default:
      return state;
  }
}