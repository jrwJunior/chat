import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Emoji } from 'emoji-mart';
import uuidv5 from 'uuid/v5';
import reactStringReplace from 'react-string-replace';

import { closeReplyMessage } from 'actions/action_editMessage';

import './style.scss';

const EditMessage = ({text, author, clearEditorState}) => {
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
      <div className='message-title'>{ author }</div>
      <div className='reply-body'>
        <div className='message-text'>
          {reactStringReplace(text, /:(.+?):/g, match => (
            <Emoji key={ uuidv5('guys.example.com', uuidv5.DNS) } emoji={match} set='messenger' size={16} />
          ))}
        </div>
      </div>
    </div>
  )
};

EditMessage.propTypes = {
  replyMessage: PropTypes.string,
  clearEditorState: PropTypes.func
}

export default EditMessage;