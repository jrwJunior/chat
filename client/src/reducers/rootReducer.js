import { combineReducers } from 'redux';

import auth from './auth';
import dialogs from './dialogs';
import dialog from './dialog';
import contacts from './contacts';
import user from './user';
import messages from './messages';
import typingMessage from './typingMessage';
import onlineStatus from './onlineStatus';
import deletePanel from './deletePanel';
import replyMessage from './replyMessage';
import notifi from './notifiBadge';
import attachment from './attachment';

const rootReducer = combineReducers({
  authUser: auth,
  chatDialogs: dialogs,
  dialog,
  contacts,
  user,
  isTyping: typingMessage,
  chat_message: messages,
  onlineStatus,
  deletePanel,
  replyMessage,
  notifi,
  attachmentFile: attachment
});

export default rootReducer;