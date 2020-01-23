import React from 'react';
import { Switch, Route } from "react-router-dom";

import Auth from 'components/pages/auth';
import Home from 'components/pages/home';

const App = () => {
  return (
    <Switch>
      <Route exact path={[ '/login', '/register' ]} component={ Auth } />
      <Route 
        path='/'
        render={ () => <Home/> } />
    </Switch>
  );
}

export default App;
