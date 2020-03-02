import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Spin, Icon } from 'antd';

import Search from '../search';
import DialogItem from '../dilaog_item';

import { getAllDialogs } from 'actions/action_dialogs';
// import Contacts from 'components/contacts';

import './style.scss';

const Dialogs = () => {
  const { dialogs, loading } = useSelector(state => state.chatDialogs);
  // const { contacts } = useSelector(state => state.contacts);
  const { typing } = useSelector(state => state.isTyping);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const setDialogs = useCallback(() => dispatch(getAllDialogs()), [dispatch]);

  useEffect(() => {
    setDialogs();
  }, [setDialogs]);

  return (
    <aside className='dialogs-panel'>
      <div className='dialogs-head'>
        <h1 className='dialogs-title'>Chats</h1>
      </div>
      <Search/>
      <Scrollbars
        autoHide
        autoHideTimeout={ 1000 }
        autoHideDuration={ 200 }
      >
        <ul className='nav-pills'>
          { loading ? <Spin indicator={ antIcon }/>: (
            dialogs.map(item => (
              <DialogItem 
                key={ item._id }
                isTyping={ typing }
                { ...item }
              />
            )
          ))}
        </ul>
      </Scrollbars>
    </aside>
  )
};

export default Dialogs;