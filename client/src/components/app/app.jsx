import React from 'react';
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from "react-router-dom";

import Auth from 'components/pages/auth';
import Home from 'components/pages/home';

const App = () => {
  const { isAunthenticated } = useSelector(state => state.user_auth);

  return (
    <Switch>
      <Route exact path={[ '/login', '/register' ]} component={ Auth } />
      <Route 
        path='/'
        exact
        render={ () => !!isAunthenticated ? <Home/> : <Redirect to='/login'/> }
      />
    </Switch>
  );
}

export default App;
