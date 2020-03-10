import React, { useRef } from 'react';
import classNames from 'classnames';
import { Emoji } from 'emoji-mart';
import { ContextMenuTrigger } from "react-contextmenu";
import format from 'date-fns/format';
import uuidv5 from 'uuid/v5';
import reactStringReplace from 'react-string-replace';

import './style.scss';
import 'style_components/confirm/style.scss';
import 'style_components/context_menu/style.scss';

const Message = props => {
  const {
    _id,
    user,
    message,
    edited,
    createdAt,
    interlocutorId,
    flaggMessage,
    deletedMessages,
    isOpenPanel
  } = props;
  const refBubble = useRef(null);
  const isMe = interlocutorId !== user._id;

  const haneleSelect = () => {
    if (!isOpenPanel) {
      return;
    }
    
    refBubble.current.classList.add('selected-bubble');
    flaggMessage(_id, isMe);
    setTimeout(() => refBubble.current.classList.remove('selected-bubble'), 500);
  }

  return (
    <>
      <div 
        className={classNames('message', { 'pull-right' : isMe })}
        style={{paddingRight: isOpenPanel ? '35px' : false}}
      >
        <div className="message-content">
          { isMe ? React.Children.map(props.children, child => (
            React.cloneElement(child, {
              onClick: haneleSelect,
              checked: !!deletedMessages.includes(_id)
            })
          )) : null }
          <ContextMenuTrigger 
            id="some_unique_identifier"
            disable={ !isMe || !!deletedMessages.includes(_id) }
          >
            <div
              ref={ refBubble }
              className={classNames('message-bubble message-text', { 'bubble-is-me' : isMe})}
              data-msg-id={ _id }
              onClick={ haneleSelect }
            >
              {reactStringReplace(message, /:(.+?):/g, match => (
                <Emoji key={ uuidv5('guys.example.com', uuidv5.DNS) } emoji={match} set='messenger' size={16} />
              ))}
              <span className='message-meta'>
                { edited ? <span className='message-edit'>edited</span> : null }
                <span className='message-create_date'>
                  { format(new Date(createdAt), 'H:mm') }
                </span>
              </span>
            </div>
          </ContextMenuTrigger>
        </div>
      </div>
    </>
  )
};

export default Message;