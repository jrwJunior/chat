import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import classNames from 'classnames';

import Avatar from 'components/avatar';
import { messageTimeConvert } from 'utils/helpers';

const DialogsItem = props => {
  const { 
    _id,
    createdAt,
    dialog,
    owner,
    interlocutor,
    lastMessage,
    isMe
  } = props;
  const a = isMe ? interlocutor : owner;
  
  return (
    <li className={ classNames('dialog-wrap', { 'is-active': dialog === _id }) } >
      <Link
        to={`/p/${a._id}`}
        className='dialog'
      >
        <div className='dialog-photo'>
          <div className='dialog-photo_inner'>
            <Avatar
              userName={ a.firstName }
              avatar={ a.avatar }
              size={ 40 }
            />
          </div>
          { a.isOnline ? <span className='online-status'/> : null }
        </div>
        <div className='dialog-message_wrap'>
          <div className="dialog-head">{ `${a.firstName} ${a.surname}` }</div>
          <div className="dialog-message">{ lastMessage.message }</div>
        </div>
        <div className="dialog-meta">
          <div className="dialog-date">{ messageTimeConvert(createdAt) }</div>
          <Badge count={ 3 }/>
        </div>
      </Link>
    </li>
  )
};

export default DialogsItem;