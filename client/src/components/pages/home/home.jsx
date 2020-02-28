import React, { useEffect, useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Dialogs from 'components/dialogs';
import Navbar from 'components/navbar';
import HistoryMessages from 'components/messages';

import { isEmpty } from 'utils/helpers';
import { getUserData } from 'actions/action_user';
import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';

import './style.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user_auth);
  const getUser = useCallback(() => dispatch(getUserData()), [dispatch]);

  useEffect(() => {
    if (isEmpty(userData)) {
      getUser();
      socket.emit(socketEvents.DIALOG_JOIN, 'guys');
    }
  }, [getUser, userData]);

  return (
    <div className='layout'>
      <Dialogs/>
      <main className='content'>
        <Route
          path='/p/:id'
          render={routeProps => (
            <>
              <Navbar/>
              <HistoryMessages { ...routeProps } />
            </>
          )}
        />
        <Route exact path='/' render={() => (
          <div className='messages-notfound'>Please select a chat to start messaging</div>
        )}/>
        <Redirect to='/'/>
      </main>
    </div>
  )
};

export default Home;