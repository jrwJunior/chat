import React, { useEffect, useCallback } from 'react';
import { getAllDialogs, getDialogId } from 'actions/action_dialogs';
import { useSelector, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import DialogBanner from './banner';
import DialogSearch from '../dialog_search';
import DialogItem from '../dilaog_item';
import './style.scss';

const Dialogs = () => {
  const { dialogs, dialogId } = useSelector(state => state.chat_dialogs);
  const dispatch = useDispatch();
  
  const setDialogs = useCallback(() => dispatch(getAllDialogs()), [dispatch]);
  const setDialogId = useCallback(id => dispatch(getDialogId(id)), [dispatch]);
  
  useEffect(() => {
    setDialogs()
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
        <ul className='nav-pills'>
          { dialogs.map(item => (
            <DialogItem 
              key={ item._id }
              dialogId={ dialogId }
              onSelected={ setDialogId }
              { ...item }
            />
          ))}
        </ul>
      </Scrollbars>
    </aside>
  )
};

export default Dialogs;