import React from 'react';

import Dialogs from 'components/dialogs';
import Navbar from 'components/navbar';
import HistoriDialog from 'components/history_dialog';
import SendPanel from 'components/send_panel';

import './style.scss';

const Home = () => {
  return (
    <div className='layout'>
      <Dialogs/>
      <main className='content'>
        <Navbar/>
        <HistoriDialog/>
        <SendPanel/>
      </main>
    </div>
  )
};

export default Home;