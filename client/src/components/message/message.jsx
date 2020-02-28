import React from 'react';
import classNames from 'classnames';
import { Emoji } from 'emoji-mart';
import uuidv5 from 'uuid/v5';
import { ContextMenuTrigger } from "react-contextmenu";
import format from 'date-fns/format';
import reactStringReplace from 'react-string-replace';

import MessageDate from 'components/message_date';

import './style.scss';
import 'style_components/confirm/style.scss';
import 'style_components/context_menu/style.scss';

const Message = props => {
  const {
    _id,
    user,
    message,
    createdAt,
    interlocutorId
  } = props;
  const isMe = interlocutorId !== user._id;

  return (
    <>
      <div className={classNames('message', { 'pull-right' : isMe })}>
        <div className="message-content">
          <MessageDate
            id={ _id }
            createdAt={createdAt}
          />
          <ContextMenuTrigger 
            id="some_unique_identifier"
            disable={ !isMe }
          >
            <div 
              className={classNames('message-bubble', { 'bubble-is-me' : isMe })}
              data-message-id={ _id }
            >
              {reactStringReplace(message, /:(.+?):/g, match => (
                <Emoji key={ uuidv5('guys.example.com', uuidv5.DNS) } emoji={match} set='messenger' size={16} />
              ))}
              <span className='message-create_date'>
                { format(new Date(createdAt), 'H:mm') }
              </span>
            </div>
          </ContextMenuTrigger>
        </div>
      </div>
    </>
  )
};

export default Message;