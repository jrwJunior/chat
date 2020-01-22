import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginForm, RegisterForm } from '../components/pages/auth';

const routes = () => (
  <Switch>
    <Route exact path='/login' component={ LoginForm } />
    <Route path='/register' component={ RegisterForm } />
  </Switch>
);

export default routes;