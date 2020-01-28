import React from 'react';
import { Badge } from 'antd';
import classNames from 'classnames';

import Avatar from 'components/avatar';
import { message_time_convert } from 'utils/helpers';

const DialogsItem = props => {
  const { 
    _id,
    user,
    text,
    created_at,
    onSelected,
    dialogId 
  } = props;

  return (
    <li className={ classNames('dialog-wrap', { 'is-active': dialogId === _id }) } >
      {/* eslint-disable-next-line */}
      <a 
        href="#" 
        className='dialog'
        onClick={ () => onSelected(_id) }
      >
        <div className='dialog-photo'>
          <div className='dialog-photo_inner'>
            <Avatar 
              userName={ user.fullname }
              avatar={ user.avatar }
              size={ 40 }
            />
          </div>
          <span className='online-status'/>
        </div>
        <div className='dialog-message_wrap'>
          <div className="dialog-head">{ user.fullname }</div>
          <div className="dialog-message">{ text }</div>
        </div>
        <div className="dialog-meta">
          <div className="dialog-date">{ message_time_convert(created_at) }</div>
          <Badge count={ 3 }/>
        </div>
      </a>
    </li>
  )
};

export default DialogsItem;