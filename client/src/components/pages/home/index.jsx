import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import Dialogs from 'components/dialogs';
import Navbar from 'components/navbar';
import HistoryMessages from 'components/messages';

import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';

import './style.scss';

const Home = () => {
  useEffect(() => {
    socket.emit(socketEvents.DIALOG_JOIN, 'guys');
  }, [])

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
      </main>
    </div>
  )
};

export default Home;