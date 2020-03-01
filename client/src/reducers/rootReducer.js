import { combineReducers } from 'redux';

import user from './user';
import dialogs from './dialogs';
import dialogPartner from './dialogPartner';
import contacts from './contacts';
import messages from './messages';
import typingMessage from './typingMessage';
import onlineStatus from './onlineStatus';
import deletePanel from './deletePanel';

const rootReducer = combineReducers({
  user_auth: user,
  chatDialogs: dialogs,
  dialogPartner,
  contacts,
  isTyping: typingMessage,
  chat_message: messages,
  onlineStatus,
  deletePanel
});

export default rootReducer;