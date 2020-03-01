import * as actionTypes from 'constans';

const initialState = {
  isOpenPanel: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.TOGGLE_DELETE_PANEL:
      return {
        isOpenPanel: action.payload
      }
    default:
      return state;
  }
}