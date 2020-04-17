import React from 'react';
import { useSelector } from 'react-redux';

import Indicator from 'components/typing_indicator';
import Avatar from 'components/avatar';

const NavbarInfo = ({ data }) => {
  const { typing } = useSelector(state => state.isTyping);

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
            style={{ color: false ? '#a9a9a9' : false }}
          >
            {/* { online ? 'online' : userLastSeen(lastSeen || data.last_seen)} */}
          </div>
        )}
      </div>
    </div>
  )
}

export default NavbarInfo;