import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Badge } from 'antd';

import { openDeletePanel } from 'actions/action_deletePanel';
import { flaggedMessage, deleteMessage } from 'actions/action_messages';
import { confirmDelete } from 'utils/helpers';

import './style.scss';
import 'style_components/badge/style.scss';

export default () => {
  const { deletedMessages } = useSelector(state => state.chat_message);
  
  const dispatch = useDispatch();
  const setIsOpenPanel = useCallback(isOpen => dispatch(openDeletePanel(isOpen)), [dispatch]);
  const setFlaggedMessage = useCallback(data => dispatch(flaggedMessage(data)), [dispatch]);
  const removeMessage = useCallback(data => dispatch(deleteMessage(data)), [dispatch]);

  const handleCancel = () => {
    setIsOpenPanel(false);
    setFlaggedMessage(null);
  }

  const handleDelete = () => {
    const count = deletedMessages.length;
    const text = deletedMessages;

    confirmDelete({
      onCallback: removeMessage,
      data: text,
      content: `Are you sure you want to delete ${count} message?`,
      okText: 'Delete'
    });
  }

  useEffect(() => {
    if (!deletedMessages.length) {
      setIsOpenPanel(false);
    }
  }, [deletedMessages, setIsOpenPanel]);

  return (
    <div className='delete-panel'>
      <div className='panel-selected'>
        <button 
          className='btn-delete'
          onClick={ handleDelete }
        >
          <Badge className='badge-slc_msg' count={ deletedMessages.length }/>
        </button>
        <Button className='btn-cancel' onClick={ handleCancel }>Cancel</Button>
      </div>
    </div>
  )
};