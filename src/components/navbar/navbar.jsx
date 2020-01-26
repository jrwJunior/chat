import React from 'react';
import { Typography } from 'antd';

import './style.scss';
const { Title } = Typography;

const Navbar = () => {
  return (
    <header className='navbar'>
      <div className='navbar-profile'>
        <Title level={ 2 } className='navbar-profile_title'>t_jane17</Title>
        <div className='profile-status'>
          <span className='online-status'/> online
        </div>
      </div>
      <div className='navbar-dropdown'>
        <svg className='dropdown-icon' height="18px" viewBox="0 0 515.555 515.555" width="18px" xmlns="http://www.w3.org/2000/svg">
          <path d="M496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0M303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0M110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"/>
        </svg>
      </div>
    </header>
  )
};

export default Navbar;