import React, { useMemo, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Indicator from 'components/typing_indicator';
import { getUsersDialog } from 'utils/helpers';
import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';
import './style.scss';

const Navbar = props => {
  const { typing } = useSelector(state => state.typingMessage);
  const { dialogs } = useSelector(state => state.chat_dialogs);

  const partnerId = props.location.pathname.split('/p/').join('');
  const dialog = useMemo(() => getUsersDialog(dialogs, partnerId), [dialogs, partnerId]);
  // eslint-disable-next-line
  const isInterlocutor = Object.values(dialog || {}).filter(item => {
    if (typeof item !== 'string' && item.hasOwnProperty('_id')) {
      return item._id === partnerId;
    }
  });

  useEffect(() => {
    socket.emit(socketEvents.STATUS_ONLINE, partnerId);
  }, [partnerId]);

  return (
    <header className='navbar'>
      <div className='navbar-profile'>
        <div className='navbar-profile_title'>
          { isInterlocutor.map(item => (
            <div key={ item._id }>
              { `${item.firstName} ${item.surname}` }
            </div>
          ))}
          { typing ? <Indicator/> : (
            <div className='profile-status'>
              online
            </div>
          )}
        </div>
      </div>
    </header>
  )
};

export default withRouter(Navbar);