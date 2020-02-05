import React from 'react';

import Dialogs from 'components/dialogs';
import Navbar from 'components/navbar';
import HistoryMessages from 'components/messages';
import SendPanel from 'components/send_panel';

import './style.scss';

const Home = () => {
  return (
    <div className='layout'>
      <Dialogs/>
      <main className='content'>
        <Navbar/>
        <HistoryMessages/>
        <SendPanel/>
      </main>
    </div>
  )
};

export default Home;