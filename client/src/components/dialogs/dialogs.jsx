import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Spin, Icon } from 'antd';

import Search from '../search';
import DialogItem from '../dilaog_item';
import Dropdown from 'components/dropdown';
import Contacts from 'components/contacts';
import UploadFile from 'components/uploadFile';

import './style.scss';

const list = (({authorizedUser, dialogs }) => (
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
));

const Dialogs = () => {
  const { dialogs, noDialogs, loading } = useSelector(state => state.chatDialogs);
  const { contacts } = useSelector(state => state.contacts);
  const { authorizedUser } = useSelector(state => state.authUser);
  console.log(dialogs)
  // eslint-disable-next-line
  const assholes = useCallback(() => list({authorizedUser, dialogs}), [dialogs]);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return (
    <aside className='dialogs-panel'>
      <div className='dialogs-head'>
        <UploadFile
          user={ authorizedUser }
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
        { !contacts.length ? assholes() : <Contacts/> }
        { noDialogs && !contacts.length ? <div className='dialogs-empty'>No contacts yet...</div> : null }
      </Scrollbars>
    </aside>
  )
};

export default Dialogs;