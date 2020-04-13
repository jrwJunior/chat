import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Spin, Icon } from 'antd';

import Search from '../search';
import DialogItem from '../dilaog_item';
import Dropdown from 'components/dropdown';
import Contacts from 'components/contacts';
import Profile from 'components/profile';

import './style.scss';

const list = (({authorizedUser, dialogs }) => {
  return (
    <ul className='nav-pills'>
      { dialogs.map(({author, partner, ...rest}) => (
          <DialogItem 
            key={ rest._id }
            authorizedUser={ authorizedUser }
            user={ authorizedUser._id === author._id ? partner : author }
            { ...rest }
          />
        )
      )}
    </ul>
  )
});

const Dialogs = () => {
  const { dialogs, loading } = useSelector(state => state.chatDialogs);
  const { contacts } = useSelector(state => state.contacts);
  const { authorizedUser, loading: isLoading } = useSelector(state => state.authUser);
  const assholes = useCallback(() => (
    list({authorizedUser, dialogs})
    // eslint-disable-next-line
  ), [dialogs]);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return (
    <aside className='dialogs-panel'>
      <div className='dialogs-head'>
        <Profile
          user={ authorizedUser }
          loading={ isLoading }
        />
        <h1 className='dialogs-title'>Chats</h1>
        <div className='separator'/>
        <Dropdown/>
      </div>
      <Search/>
      <Scrollbars
        autoHide
        autoHideTimeout={ 1000 }
        autoHideDuration={ 200 }
      >
        { loading ? <Spin indicator={ antIcon }/> : null }
        {/* { (!dialogs.length && !contacts.length) ? <div className='dialogs-empty'>No contacts yet...</div> : null } */}
        { !contacts.length ? assholes() : <Contacts/> }
      </Scrollbars>
    </aside>
  )
};

export default Dialogs;