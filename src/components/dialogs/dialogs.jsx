import React from 'react';

import DialogBanner from './banner';
import DialogSearch from './search';
import DialogItem from './item';
import './style.scss';

const Dialogs = () => {
  return (
    <aside className='dialogs-panel'>
      <DialogBanner/>
      <DialogSearch/>
      <DialogItem/>
    </aside>
  )
};

export default Dialogs;