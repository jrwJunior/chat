import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Auth from 'components/pages/auth';
import Home from 'components/pages/home';

const App = () => {
  return (
    <Switch>
      <Route exact path={[ '/login', '/register' ]} component={ Auth } />
      <Route
        path='/'
        render={ () => {
          const loggedIn = localStorage.getItem('authentication');

          return !!loggedIn ? <Home/> : <Redirect to='/login'/>
        }}
      />
      <Redirect to='/'/>
    </Switch>
  );
}

export default App;
