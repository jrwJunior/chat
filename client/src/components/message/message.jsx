import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Typography } from 'antd';
import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';

import Avatar from 'components/avatar';
import Time from 'components/time';
import Popover from 'components/popover';

import { deleteMessage } from 'actions/action_messages';
import './style.scss';
import 'style_components/confirm/style.scss';

const { Text } = Typography;

const Message = props => {
  const { message, createdAt, user, isMe, _id } = props;
  const dispatch = useDispatch();

  const removeMessage = useCallback(() => dispatch(deleteMessage(_id)), [dispatch, _id]);

  return (
    <>
      <div className={classNames('message', { 'pull-right' : isMe })}>
        { !isMe ? (
          <div className="message-author">
            <Avatar 
              userName={ `${ user.firstName }` }
              avatar={ user.avatar }
              size={ 30 }
            />
          </div>
        ) : null }
        <div className="message-content">
          <Popover
            removeMessage={ removeMessage }
          >
            <div className={classNames('message-bubble', { 'bubble-is-me' : isMe })}>
              {reactStringReplace(message, /:(.+?):/g, (match, i) => (
                <Emoji key={ i } emoji={match} set='messenger' size={16} />
              ))}
              {/* <Text className={classNames({ 'text-color_black' : !isMe })}>{ message }</Text> */}
            </div>
          </Popover>
          <div className='message-create_date'>
            <Time
              created_at={ createdAt }
            />
          </div>
        </div>
      </div>
    </>
  )
};

export default Message;