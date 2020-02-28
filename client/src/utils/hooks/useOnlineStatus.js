import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';

const useOnlineStatus = roomId => {
  const { online, lastSeen } = useSelector(state => state.onlineStatus);

  useEffect(() => {
    socket.emit(socketEvents.STATUS_ONLINE, roomId);
  }, [online, roomId]);

  return {
    online,
    lastSeen
  };
};

export {
  useOnlineStatus
};