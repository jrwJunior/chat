import React, { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Dropdown } from 'antd';

import { logOut } from 'actions/action_auth';
import { confirmDelete } from 'utils/helpers';

import 'style_components/dropdown/style.scss';
import 'style_components/confirm/style.scss';

export default () => {
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
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={handleConfirm}>
        Log out
      </Menu.Item>
    </Menu>
  );

  if (logoutUser) {
    return <Redirect to='/login'/>
  }

  return (
    <Dropdown 
      overlay={menu}
      placement="bottomRight"
      trigger={['click']}
    >
      <span className='dropdown-icon'>
        <svg height="512" viewBox="0 0 515.555 515.555" width="512" xmlns="http://www.w3.org/2000/svg">
          <path d="M303.347 18.875c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 212.209c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 405.541c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0"/>
        </svg>
      </span>
    </Dropdown>
  )
};