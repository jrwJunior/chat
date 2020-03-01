import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Badge } from 'antd';

import { openDeletePanel } from 'actions/action_deletePanel';
import { flaggedMessage, deleteMessage } from 'actions/action_messages';
import { confirmDelete } from 'utils/helpers';

import './style.scss';
import 'style_components/badge/style.scss';

export default props => {
  const { deletedMessages } = useSelector(state => state.chat_message);
  const { dialogId } = props;

  const dispatch = useDispatch();
  const setIsOpenPanel = useCallback(isOpen => dispatch(openDeletePanel(isOpen)), [dispatch]);
  const setFlaggedMessage = useCallback(id => dispatch(flaggedMessage(id)), [dispatch]);
  const removeMessage = useCallback((messages, dialogId) => dispatch(deleteMessage(messages, dialogId)), [dispatch]);

  const handleCancel = () => {
    setIsOpenPanel(false);
    setFlaggedMessage(null);
  }

  const handleDelete = () => {
    const count = deletedMessages.length;
    const deleteMessage = deletedMessages;

    confirmDelete({
      removeMessage,
      deleteMessage, 
      dialogId,
      count
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
          <Badge count={ deletedMessages.length }/>
        </button>
        <Button type="primary" className='cancel-btn' onClick={ handleCancel }>Cancel</Button>
      </div>
    </div>
  )
};