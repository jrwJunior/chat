import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import Dialogs from 'components/dialogs';
import Navbar from 'components/navbar';
import HistoryMessages from 'components/messages';

import { getAllDialogs } from 'actions/action_dialogs';
import { getAuthorizedUser } from 'actions/action_user';

import './style.scss';

const Home = () => {
  const dispatch = useDispatch();
  const dialogsUser = useCallback(() => dispatch(getAllDialogs()), [dispatch]);
  const authUser = useCallback(() => dispatch(getAuthorizedUser()), [dispatch]);

  useEffect(() => {
    document.body.classList.add('loggedIn');
    
    dialogsUser();
    authUser();
  }, [dialogsUser, authUser]);

  return (
    <div className='layout'>
      <Dialogs/>
      <main className='content'>
        <Route
          path='/im/p/:id'
          render={routeProps => (
            <>
              <Navbar/>
              <HistoryMessages { ...routeProps } />
            </>
          )}
        />
        <Route exact path='/im' render={() => (
          <div className='messages-notfound'>Please select a chat to start messaging</div>
        )}/>
      </main>
    </div>
  )
};

export default Home;