import { eventChannel } from 'redux-saga';
import { take, call, put, select, fork } from 'redux-saga/effects';

import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';
import { setLastMessageChat } from 'actions/action_dialogs';

function createChannel() {
  const subscribe = emitter => {
    socket.on(socketEvents.DIALOG_RECEIVED, emitter);

    return () => {
      socket.removeListener(socketEvents.DIALOG_RECEIVED, emitter);
    }
  }

  return eventChannel(subscribe);
}

function* updateLastMessage(lastMessage) {
  if (lastMessage) {
    const { dialogs } = yield select(state => state.chat_dialogs);
    const item = dialogs.find(item => item._id === lastMessage.dialog);
  
    if (item.lastMessage._id !== lastMessage._id) {
      item.lastMessage = lastMessage;
      yield put(setLastMessageChat(item));
    }
  }
}

function* connectChannel() {
  const channel = yield call(createChannel);

  while(true) {
    const { lastMessage } = yield take(channel);
    yield fork(updateLastMessage, lastMessage);
  }
}

function* mySaga() {
  yield fork(connectChannel);
}

export default mySaga;