import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';

const useOnlineStatus = userId => {
  const { online } = useSelector(state => state.onlineStatus);

  useEffect(() => {
    socket.emit(socketEvents.AUTH_USER, userId);
  }, [online, userId]);

  return {
    online
  };
};

export {
  useOnlineStatus
};