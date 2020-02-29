import { combineReducers } from 'redux';

import user from './user';
import dialogs from './dialogs';
import contacts from './contacts';
import messages from './messages';
import typingMessage from './typingMessage';
import onlineStatus from './onlineStatus';
import editPanel from './editPanel';

const rootReducer = combineReducers({
  user_auth: user,
  chatDialogs: dialogs,
  contacts,
  isTyping: typingMessage,
  chat_message: messages,
  onlineStatus,
  editPanel
});

export default rootReducer;