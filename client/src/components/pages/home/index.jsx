import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import Dialogs from 'components/dialogs';
import Navbar from 'components/navbar';
import HistoryMessages from 'components/messages';

import { getAllDialogs } from 'actions/action_dialogs';

// import { isEmpty } from 'utils/helpers';
// import { socket } from 'utils/socket';
// import { socketEvents } from 'constans/socketEvents';

import './style.scss';

const Home = () => {
  // const { authorizedUser } = useSelector(state => state.authUser);
  // const { userOnline } = useSelector(state => state.onlineStatus);
  const dispatch = useDispatch();
  
  const dialogsUser = useCallback(() => dispatch(getAllDialogs()), [dispatch]);

  useEffect(() => {
    document.body.classList.add('loggedIn');
    
    dialogsUser();
  }, [dialogsUser]);

  // useEffect(() => {
  //   // if (isEmpty(authorizedUser)) {
  //     socket.emit(socketEvents.AUTH_USER, authorizedUser._id);
  //     console.log('effect')
  //   // }

  //   return () => socket.removeListener(socketEvents.AUTH_USER, authorizedUser._id);
  // }, [userOnline, authorizedUser._id]);

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