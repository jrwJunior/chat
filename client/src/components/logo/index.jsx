import React from 'react';

import './style.scss';
import logo from 'img/logo.svg';

const Logo = () => (
  <a href="/" className='logo'>
    <span className='logo-inner'>
      <img src={logo} alt="IChat"/>
    </span>
    <span className='logo-text'>IChat</span>
  </a>
);

export default Logo;