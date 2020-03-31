import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';

import Avatar from 'components/avatar';

import { useOnlineStatus } from 'utils/hooks';

const ContactsItem = props => {
  const { 
    _id,
    avatar,
    firstName,
    surname,
  } = props;
  const { online } = useOnlineStatus(_id);
  const foo = props.location.pathname.split('/p/').join('') === _id;

  return (
    <li
      className={ classNames('dialog-wrap', 
        {'is-active': foo}) 
      }
    >
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
          { online ? <span className='online-status'/> : null }
        </div>
        <div className='dialog-message_wrap'>
          <div className="dialog-head">{ `${firstName} ${surname}` }</div>
        </div>
      </Link>
    </li>
  )
};

export default withRouter(ContactsItem);