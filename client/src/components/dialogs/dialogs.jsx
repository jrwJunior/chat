import React, { useEffect, useCallback } from 'react';
import { getAllDialogs } from 'actions/action_dialogs';
import { useSelector, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import DialogBanner from './banner';
import DialogSearch from '../dialog_search';
import DialogItem from '../dilaog_item';
import Contacts from 'components/contacts';
import './style.scss';

const Dialogs = () => {
  const { userData } = useSelector(state => state.user_auth);
  const { dialogs } = useSelector(state => state.chat_dialogs);
  const { contacts } = useSelector(state => state.dialogs_contacts);
  const dispatch = useDispatch();
  
  const setDialogs = useCallback(() => dispatch(getAllDialogs()), [dispatch]);
  
  useEffect(() => {
    setDialogs();
  }, [setDialogs]);

  return (
    <aside className='dialogs-panel'>
      <DialogBanner/>
      <DialogSearch/>
      <Scrollbars
        autoHide
        autoHideTimeout={ 1000 }
        autoHideDuration={ 200 }
      >
        { !contacts.length ? (
          <ul className='nav-pills'>
            { dialogs.map(item => (
              <DialogItem 
                key={ item._id }
                isMe={ item.owner._id === userData._id }
                { ...item }
              />
            ))}
          </ul>
        ) : <Contacts/> }
      </Scrollbars>
    </aside>
  )
};

export default Dialogs;