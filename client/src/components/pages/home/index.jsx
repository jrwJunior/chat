import React from 'react';
import { Route } from 'react-router-dom';

import Dialogs from 'components/dialogs';
import Navbar from 'components/navbar';
import HistoryMessages from 'components/messages';

import './style.scss';

const Home = () => {
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