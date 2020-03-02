import React from 'react';
import { Emoji } from 'emoji-mart';
import uuidv5 from 'uuid/v5';
import reactStringReplace from 'react-string-replace';

import './style.scss';

const ReplyMessage = () => {
  return (
    <div className='reply-wrap'>
      <button type='button' className='reply-cancel'>Remove</button>
      <div className='message-reply'>
        <div className='message-title'>Edit Message</div>
      </div>
      <div className='reply-body'>
        <div className='message-text'>
          {reactStringReplace('Hi :grinning:', /:(.+?):/g, match => (
            <Emoji key={ uuidv5('guys.example.com', uuidv5.DNS) } emoji={match} set='messenger' size={16} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default ReplyMessage;