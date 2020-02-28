import { combineReducers } from 'redux';

import user from './user';
import dialogs from './dialogs';
import contacts from './contacts';
import messages from './messages';
import typingMessage from './typingMessage';
import onlineStatus from './onlineStatus';

const rootReducer = combineReducers({
  user_auth: user,
  chat_dialogs: dialogs,
  dialogs_contacts: contacts,
  chat_message: messages,
  typingMessage,
  onlineStatus
});

export default rootReducer;