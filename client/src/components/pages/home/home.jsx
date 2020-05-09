import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import Dialogs from 'components/dialogs';
import Navbar from 'components/navbar';
import HistoryMessages from 'components/messages';

import { getAllDialogs } from 'actions/action_dialogs';

import './style.scss';

const Home = () => {
  const dispatch = useDispatch();
  const dialogsUser = useCallback(() => dispatch(getAllDialogs()), [dispatch]);

  useEffect(() => {
    document.body.classList.add('loggedIn');
    dialogsUser();
  }, [dialogsUser]);

  return (
    <div className='layout'>
      <Dialogs/>
      <main className='content'>
        <Route
          path='/im/p/:id'
          render={routeProps => (
            <>
              <Navbar { ...routeProps }/>
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