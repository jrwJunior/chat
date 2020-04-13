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
      const lastMessage = action.payload;

      return {
        ...state,
        dialogs: state.dialogs.map(item => {
          if (item.lastMessage._id !== lastMessage._id) {
            item.lastMessage = lastMessage;
          }
  
          return item;
        })
      }
    case actionTypes.READED_LAST_MESSAGE:
        const { readed, dialogId } = action.payload;

        return {
          ...state,
          dialogs: state.dialogs.map(item => {
            if (item.lastMessage.dialog === dialogId) {
              item.lastMessage.readed = readed;
            }
  
            return item;
          })
        }
    case actionTypes.SET_DIALOG:
      return {
        ...state,
        noDialogs: !action.payload.length,
        dialogs: [
          ...action.payload
        ]
      }
    default:
      return state;
  }
}