import React, { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Emoji } from 'emoji-mart';
import { ContextMenuTrigger } from "react-contextmenu";
import format from 'date-fns/format';
import uuidv5 from 'uuid/v5';
import reactStringReplace from 'react-string-replace';

import { editMessage } from 'actions/action_editMessage';
import createdDateMsg from './createdDate';

import './style.scss';
import 'style_components/context_menu/style.scss';

const Message = props => {
  const {
    _id,
    message,
    ownerMessage,
    user,
    edited,
    readed,
    createdAt,
    replyMessage,
    selectedMessage,
    deletedMessages,
    isOpenPanel,
    createdDate
  } = props;
  const msgRef = useRef(null);

  const dispatch = useDispatch();
  const setReplyMessage = useCallback(id => dispatch(editMessage(id)), [dispatch]);

  const haneleSelect = () => {
    if (isOpenPanel) {
      msgRef.current.classList.add('selected-bubble');
      selectedMessage(_id, ownerMessage);
      setTimeout(() => msgRef.current.classList.remove('selected-bubble'), 500);
    }
  }

  const handleReplyMsg = evt => {
    const id = evt.target.dataset.msgId;

    if (!isOpenPanel) {
      setReplyMessage({
        message,
        id,
        author: `${user.firstName} ${user.surname}`,
        editing: false
      });
    }
  }
  return (
    <>
      <div 
        className={classNames('message', { 'pull-right' : ownerMessage })}
        style={{paddingRight: isOpenPanel ? '35px' : false}}
      >
        { createdDateMsg({createdDate, createdAt}) }
        <div className="message-content">
          { ownerMessage ? React.Children.map(props.children, child => (
            React.cloneElement(child, {
              onClick: haneleSelect,
              checked: !!deletedMessages.includes(_id)
            })
          )) : null }
          <ContextMenuTrigger 
            id="some_unique_identifier"
          >
            <div
              ref={ msgRef }
              className={classNames('message-bubble message-text', { 'bubble-is-me' : ownerMessage})}
              data-msg-id={ _id }
              onClick={ haneleSelect }
              onDoubleClick={ handleReplyMsg }
            >
              { replyMessage.map(({ author, message, _id }) => (
                <div 
                  className='message-reply' 
                  key={ _id }
                >
                  <div className='message-reply_border' style={{backgroundColor: !ownerMessage ? '#3796EE' : false}}/>
                  <div className='message-reply_author' style={{color: !ownerMessage ? '#3796EE' : false}}>
                    { author }
                  </div>
                  <div className='message-reply_body'>
                    { message }
                  </div>
                </div>
              )) }
              {reactStringReplace(message, /:(.+?):/g, match => (
                <Emoji key={ uuidv5('guys.example.com', uuidv5.DNS) } emoji={match} set='messenger' size={16} />
              ))}
              <span className='message-meta'>
                { edited ? <span className='message-edit'>edited</span> : null }
                <span className='message-create_date'>
                  { format(new Date(createdAt), 'H:mm') }
                </span>
                { ownerMessage ? (
                  readed ? <span className='icon-readed readed'/> : <span className='icon-noread readed'/>
                ) : null }
              </span>
            </div>
          </ContextMenuTrigger>
        </div>
      </div>
    </>
  )
};

export default Message;