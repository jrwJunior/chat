import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Indicator from 'components/typing_indicator';
import Avatar from 'components/avatar';

const Navbar = ({ data }) => {
  const { typing } = useSelector(state => state.isTyping);
  const { userOnline } = useSelector(state => state.onlineStatus);

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
            { userOnline.includes(data._id) ? (
              <>
                <span className='online-status'/>
                Active now
              </>
            ): 'Not active now'}
          </div>
        )}
      </div>
    </div>
  )
};

Navbar.propTypes = {
  data: PropTypes.object
}

export default Navbar;