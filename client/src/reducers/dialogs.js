import * as actionTypes from 'constans';

const initialState = {
  dialogs: [],
  noDialogs: false,
  loading: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.DEALOGS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.DIALOGS_LOAD_SUCCESS:
      return {
        dialogs: action.payload,
        noDialogs: !action.payload.length,
        loading: false
      }
    case actionTypes.SET_LAST_MESSAGE:
      return {
        ...state,
        dialogs: action.payload
      }
    case actionTypes.READED_LAST_MESSAGE:
        const { dialogId } = action.payload;

        return {
          ...state,
          dialogs: state.dialogs.map(item => {
            if (item.lastMessage.dialog === dialogId) {
              item.lastMessage.readed = true;
            }
  
            return item;
          })
        }
    case actionTypes.SET_DIALOG:
      return {
        ...state,
        noDialogs: !state.dialogs,
        dialogs: state.dialogs.concat(action.payload)
      }
    default:
      return state;
  }
}