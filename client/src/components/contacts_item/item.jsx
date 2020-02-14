import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'components/avatar';
import { messageTimeConvert } from 'utils/helpers';

const ContactsItem = props => {
  const { 
    _id,
    createdAt,
    avatar,
    firstName,
    surname,
    isOnline
  } = props;

  return (
    <li className='dialog-wrap' >
      <Link
        to={`/p/${_id}`}
        className='dialog'
      >
        <div className='dialog-photo'>
          <div className='dialog-photo_inner'>
            <Avatar
              userName={ firstName }
              avatar={ avatar }
              size={ 40 }
            />
          </div>
          { isOnline ? <span className='online-status'/> : null }
        </div>
        <div className='dialog-message_wrap'>
          <div className="dialog-head">{ `${firstName} ${surname}` }</div>
        </div>
        <div className="dialog-meta">
          <div className="dialog-date">{ messageTimeConvert(createdAt) }</div>
        </div>
      </Link>
    </li>
  )
};

export default ContactsItem;