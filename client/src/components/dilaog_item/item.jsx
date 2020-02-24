import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Badge } from 'antd';
import classNames from 'classnames';
import uuidv5 from 'uuid/v5';
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';

import Avatar from 'components/avatar';
import Indicator from 'components/typing_indicator';
import { messageTimeConvert } from 'utils/helpers';

import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';

const DialogsItem = props => {
  const {
    owner,
    interlocutor,
    lastMessage,
    isTyping
  } = props;
  const { userData } = useSelector(state => state.user_auth);
  const isInterlocutor = userData._id === owner._id ? interlocutor : owner;
  const userId = props.location.pathname.split('/p/').join('');

  useEffect(() => {
    const roomId = 'some room';
    socket.emit(socketEvents.DIALOG_JOIN, roomId);
  }, []);

  return (
    <li className={ classNames('dialog-wrap', {'is-active': isInterlocutor._id === userId}) } >
      <Link
        to={`/p/${isInterlocutor._id}`}
        className='dialog'
      >
        <div className='dialog-photo'>
          <div className='dialog-photo_inner'>
            <Avatar
              userName={ isInterlocutor.firstName }
              avatar={ isInterlocutor.avatar }
              size={ 40 }
            />
          </div>
          {/* { isInterlocutor.isOnline ? <span className='online-status'/> : null } */}
        </div>
        <div className='dialog-message_wrap'>
          <div className="dialog-head">{ `${isInterlocutor.firstName} ${isInterlocutor.surname}` }</div>
          { isTyping ? <Indicator/> : (
            <>
              {(lastMessage.user._id || lastMessage.user) !== isInterlocutor._id ? <span style={{color: '#4ba1ff'}}>You:&nbsp;</span> : null}
              {reactStringReplace(lastMessage.message, /:(.+?):/g, match => (
                <Emoji key={ uuidv5('guys.example.com', uuidv5.DNS) } emoji={match} set='messenger' size={16} />
              ))}
            </>
          )}
        </div>
        <div className="dialog-meta">
          <div className="dialog-date">{ messageTimeConvert(lastMessage.createdAt) }</div>
          <Badge count={ 3 }/>
        </div>
      </Link>
    </li>
  )
};

export default withRouter(DialogsItem);