import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Auth from 'components/pages/auth';
import Home from 'components/pages/home';

const App = () => {
  return (
    <Switch>
      <Route exact path={[ '/login', '/register' ]} component={ Auth } />
      <Route
        path='/im'
        render={ () => {
          const authentication = localStorage.getItem('auth_key');

          if (authentication) {
            return <Home/>;
          }
          return <Redirect exact to='/login'/>;
        }}
      />
      <Redirect to='/im'/>
    </Switch>
  );
}

export default App;
