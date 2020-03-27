import React from 'react';
import { useSelector } from 'react-redux';

import Indicator from 'components/typing_indicator';
import Avatar from 'components/avatar';

import { userLastSeen } from 'utils/helpers';
import { useOnlineStatus } from 'utils/hooks';

const NavbarInfo = ({ data }) => {
  const { typing } = useSelector(state => state.isTyping);
  const { online, lastSeen } = useOnlineStatus('guys');

  return (
    <div className='navbar-peer'>
      <Avatar
        userName={ data.firstName }
        avatar={ data.avatar }
        size={ 35 }
      />
      <div className='navbar-peer-title'>
        { `${data.firstName} ${data.surname}` }
        { typing ? <Indicator/> : (
          <div 
            className='profile-peer-status' 
            style={{ color: !online ? '#a9a9a9' : false }}
          >
            { online ? 'online' : userLastSeen(lastSeen || data.last_seen)}
          </div>
        )}
      </div>
    </div>
  )
}

export default NavbarInfo;