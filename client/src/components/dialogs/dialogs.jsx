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
  const { dialogs } = useSelector(state => state.chatDialogs);
  const { contacts } = useSelector(state => state.contacts);
  const { typing } = useSelector(state => state.isTyping);

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
                isTyping={ typing }
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