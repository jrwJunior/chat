import * as actionTypes from 'constans';

const initialState = {
  fileLoading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FILE_REQUESTED:
      return {
        fileLoading: true
      }
    case actionTypes.FILE_SUCCESSFULLY_UPLOADED:
      return {
        fileLoading: false,
      }
    default:
      return state;
  }
}