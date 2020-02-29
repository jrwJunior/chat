import * as actionTypes from 'constans';

const initialState = {
  openedPanel: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.OPEN_PANEL_EDIT:
      return {
        openedPanel: action.payload
      }
    default:
      return state;
  }
}