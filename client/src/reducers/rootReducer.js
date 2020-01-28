import { combineReducers } from 'redux';

import dialogs from './dialogs';
import messages from './messages';

const rootReducer = combineReducers({
  chat_dialogs: dialogs,
  chat_message: messages
});

export default rootReducer;