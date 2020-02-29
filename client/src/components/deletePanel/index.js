import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Badge } from 'antd';

import { openPanelEdit } from 'actions/action_editPanel';
import { selectMessage } from 'actions/action_messages';

import './style.scss';
import 'style_components/badge/style.scss';

export default () => {
  const { selectedMessages } = useSelector(state => state.chat_message);

  const dispatch = useDispatch();
  const setPanel = useCallback(open => dispatch(openPanelEdit(open)), [dispatch]);
  const setSelectMessage = useCallback(id => dispatch(selectMessage(id)), [dispatch]);

  const handleCancel = () => {
    setPanel(false);
    setSelectMessage(null);
  }

  useEffect(() => {
    if (!selectedMessages.length) {
      setPanel(false);
    }
  }, [selectedMessages, setPanel]);

  return (
    <div className='delete-panel'>
      <div className='panel-selected'>
        <button className='btn-delete'>
          <Badge count={ selectedMessages.length }/>
        </button>
        <Button type="primary" className='cancel-btn' onClick={ handleCancel }>Cancel</Button>
      </div>
    </div>
  )
};

// Delete&nbsp;{selectedMessages.length}