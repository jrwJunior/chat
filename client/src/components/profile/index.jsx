import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton, Popover } from 'antd';

import Avatar from 'components/avatar';
import { confirmDelete } from 'utils/helpers';
import { logOut } from 'actions/action_auth';

import './style.scss';

const Profile = ({ user, loading }) => {
  const [visible, setVisible] = useState(false);
  const { logoutUser } = useSelector(state => state.authUser);

  const dispatch = useDispatch();
  const userLogOut = useCallback(() => dispatch(logOut()), [dispatch]);

  const handleConfirm = () => {
    confirmDelete({
      onCallback: userLogOut,
      content: 'Are you sure you want to log out?',
      data: null,
      okText: 'Log out'
    });

    setVisible(false);
  }

  const content = (
    <div className='peer-wrap'>
      <div className="peer-head">
        <span>Profile</span>
        <button type='button' className='peer-btn' onClick={ handleConfirm }>Log out</button>
      </div>
      <div className="peer-profile">
        <div className="peer-profile_photo">
          <Avatar
            userName={ user.firstName }
            avatar={ user.avatar }
            size={ 52 }
          />
        </div>
        <div className='peer-profile_info'>
          <div className="peer-profile_name">
            { `${user.firstName} ${user.surname}` }
          </div>
          <div className="peer-profile_desc">
            online
          </div>
        </div>
      </div>
    </div>
  )

  if (logoutUser) {
    return <Redirect to='/login'/>
  }

  return (
    <Popover
      content={ content }
      trigger="click"
      placement="bottomLeft"
      visible={ visible }
      onVisibleChange={() => setVisible(() => !visible)}
    >
      <button 
        type='button'
        className='peer-btn'
      >
        <Skeleton
          loading={ loading } 
          active 
          avatar
          title={ false }
          paragraph={ false }
        >
          <Avatar
            userName={ user.firstName }
            avatar={ user.avatar }
            size={ 40 }
          />
        </Skeleton>
      </button>
    </Popover>
  )
};

export default Profile;