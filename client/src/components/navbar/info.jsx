import React from 'react';
import { useSelector } from 'react-redux';

import Indicator from 'components/typing_indicator';
import Avatar from 'components/avatar';

import { userLastSeen } from 'utils/helpers';
import { useOnlineStatus } from 'utils/hooks';

const NavbarInfo = ({partner}) => {
  const { typing } = useSelector(state => state.isTyping);
  const { online, lastSeen } = useOnlineStatus('guys');

  return (
    <div className='navbar-peer'>
      <Avatar
        userName={ partner.firstName }
        avatar={ partner.avatar }
        size={ 35 }
      />
      <div className='navbar-peer-title'>
        { `${partner.firstName} ${partner.surname}` }
        { typing ? <Indicator/> : (
          <div 
            className='profile-peer-status' 
            style={{ color: !online ? '#a9a9a9' : false }}
          >
            { online ? 'online' : userLastSeen(lastSeen || partner.last_seen)}
          </div>
        )}
      </div>
    </div>
  )
}

export default NavbarInfo;