import React, { useEffect, useCallback } from 'react';
import { getAllDialogs } from 'actions/action_dialogs';
import { useSelector, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Spin, Icon } from 'antd';

import DialogBanner from './banner';
import Search from '../search';
import DialogItem from '../dilaog_item';
import Contacts from 'components/contacts';

import './style.scss';

const Dialogs = () => {
  const { dialogs, loading } = useSelector(state => state.chatDialogs);
  const { contacts } = useSelector(state => state.contacts);
  const { typing } = useSelector(state => state.isTyping);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const setDialogs = useCallback(() => dispatch(getAllDialogs()), [dispatch]);

  useEffect(() => {
    setDialogs();
  }, [setDialogs]);

  return (
    <aside className='dialogs-panel'>
      <DialogBanner/>
      <Search/>
      <Scrollbars
        autoHide
        autoHideTimeout={ 1000 }
        autoHideDuration={ 200 }
      >
        { !contacts.length ? (
          <ul className='nav-pills'>
            { loading ? (
              <Spin indicator={ antIcon }/>
            ): dialogs.map(item => (
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