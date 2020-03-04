import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Emoji } from 'emoji-mart';
import uuidv5 from 'uuid/v5';
import reactStringReplace from 'react-string-replace';

import { closeReplyMessage } from 'actions/action_reply';

import './style.scss';

const ReplyMessage = ({replyMessage}) => {
  const dispatch = useDispatch();
  const setCloseReplyMessage = useCallback(() => dispatch(closeReplyMessage()), [dispatch]);

  return (
    <div className='reply-wrap'>
      <button 
        type='button' 
        className='reply-cancel'
        onClick={ setCloseReplyMessage }
      >
        Remove
      </button>
      <div className='message-reply'>
        <div className='message-title'>Edit Message</div>
      </div>
      <div className='reply-body'>
        <div className='message-text'>
          {reactStringReplace(replyMessage.message, /:(.+?):/g, match => (
            <Emoji key={ uuidv5('guys.example.com', uuidv5.DNS) } emoji={match} set='messenger' size={16} />
          ))}
        </div>
      </div>
    </div>
  )
};

ReplyMessage.propTypes = {
  replyMessage: PropTypes.object
}

export default ReplyMessage;