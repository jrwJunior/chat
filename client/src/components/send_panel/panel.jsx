import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Form } from 'antd';

import ButtonSend from 'components/buttons/buttonSend';
import { sendMessage } from 'actions/action_messages';
import { getUsersDialog } from 'utils/helpers';
import './style.scss';
// const { TextArea } = Input;

const SendPanel = ({ userId }) => {
  const [value, setValue] = useState('');
  const { dialogs } = useSelector(state => state.chat_dialogs);
  const dispatch = useDispatch();

  const addMessage = useCallback((message, dialogId, interlocutor) => dispatch(sendMessage(message, dialogId, interlocutor)), [dispatch]);
  const handleSubmit = useCallback(evt => {
    evt.preventDefault();

    const dialog = getUsersDialog(dialogs, userId) || {};

    addMessage(value, dialog._id, userId);
    setValue('');
  }, [addMessage, value, userId, dialogs]);

  return (
    <div className='send-filed_panel'>
      <div className='send-field_wrap'>
        <Form onSubmit={ handleSubmit }>
          <Input
            className='send-textarea'
            placeholder='Type a message...'
            value={ value }
            onChange={ evt => setValue(evt.target.value) }
          />
        </Form>
      </div>
      <ButtonSend
        onClick={ handleSubmit }
      />
    </div>
  )
};

export default SendPanel;