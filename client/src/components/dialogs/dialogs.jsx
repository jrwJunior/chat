import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Spin, Icon } from 'antd';

import Search from '../search';
import DialogItem from '../dilaog_item';

import Contacts from 'components/contacts';

import './style.scss';

const list = (({authorizedUser, loading, dialogs }) => {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return (
    <ul className='nav-pills'>
      { loading ? <Spin indicator={ antIcon }/>: (
        dialogs.map(({author, partner, ...rest}) => (
          <DialogItem 
            key={ rest._id }
            authorizedUser={ authorizedUser }
            user={ authorizedUser._id === author._id ? partner : author }
            { ...rest }
          />
        )
      ))}
    </ul>
  )
});

const Dialogs = () => {
  const { dialogs, loading } = useSelector(state => state.chatDialogs);
  const { contacts } = useSelector(state => state.contacts);
  const { authorizedUser } = useSelector(state => state.user);
  const assholes = useCallback(() => (
    list({authorizedUser, loading, dialogs})
    // eslint-disable-next-line
  ), [dialogs]);

  return (
    <aside className='dialogs-panel'>
      <div className='dialogs-head'>
        <h1 className='dialogs-title'>Chat</h1>
      </div>
      <Search/>
      <Scrollbars
        autoHide
        autoHideTimeout={ 1000 }
        autoHideDuration={ 200 }
      >
        { (!dialogs.length && !contacts.length) ? <div className='dialogs-empty'>No contacts yet...</div> : null }
        { !contacts.length ? assholes() : <Contacts/> }
      </Scrollbars>
    </aside>
  )
};

export default Dialogs;