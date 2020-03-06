import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Emoji } from 'emoji-mart';
import uuidv5 from 'uuid/v5';
import reactStringReplace from 'react-string-replace';

import { closeReplyMessage } from 'actions/action_reply';

import './style.scss';

const ReplyMessage = ({replyMessage, clearEditorState}) => {
  const dispatch = useDispatch();
  const setCloseReplyMessage = useCallback(() => dispatch(closeReplyMessage()), [dispatch]);

  const handleCancel = () => {
    setCloseReplyMessage();
    clearEditorState();
  }

  return (
    <div className='reply-wrap'>
      <button 
        type='button' 
        className='reply-cancel'
        onClick={ handleCancel }
      >
        Remove
      </button>
      <div className='message-reply'>
        <div className='message-title'>Edit Message</div>
      </div>
      <div className='reply-body'>
        <div className='message-text'>
          {reactStringReplace(replyMessage, /:(.+?):/g, match => (
            <Emoji key={ uuidv5('guys.example.com', uuidv5.DNS) } emoji={match} set='messenger' size={16} />
          ))}
        </div>
      </div>
    </div>
  )
};

ReplyMessage.propTypes = {
  replyMessage: PropTypes.string,
  clearEditorState: PropTypes.func
}

export default ReplyMessage;