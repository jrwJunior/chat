import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { contactId } from 'actions/action_contacs';
import Avatar from 'components/avatar';

// import { useOnlineStatus } from 'utils/hooks';

const ContactsItem = props => {
  const { 
    _id,
    avatar,
    firstName,
    surname
  } = props;
  const dispatch = useDispatch()
  const setContactId = useCallback(id => dispatch(contactId(id)), [dispatch]);
  // const { online } = useOnlineStatus(_id);

  return (
    <li
      className='dialog-wrap'
      onClick={() => setContactId(_id)}
    >
      <Link
        to={`/im/p/${_id}`}
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
          {/* { online ? <span className='online-status'/> : null } */}
        </div>
        <div className='dialog-message_wrap'>
          <div className="dialog-head">{ `${firstName} ${surname}` }</div>
        </div>
      </Link>
    </li>
  )
};

ContactsItem.propTypes = {
  _id: PropTypes.string,
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  surname: PropTypes.string
}

export default ContactsItem;