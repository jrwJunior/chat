import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Typography } from 'antd';

import { LoginForm, RegisterForm } from 'modules';
import './style.scss';

const { Title, Text } = Typography;

const Auth = () => {
  return (
    <div className="auth-container">
      <div className='wrapper-auth'>
        <Title>Be together, whenever.</Title>
        <Text className='text'>A simple way to text, audio chat and plan things all in one place.</Text>
        <Switch>
          <Route exact path='/login' component={ LoginForm } />
          <Route path='/register' component={ RegisterForm } />
        </Switch>
      </div>
      <div className='scene-hero' />
    </div>
  );
};

export default Auth;