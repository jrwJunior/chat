import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setContactId } from 'actions/action_contacs';
import Avatar from 'components/avatar';
import { deleteDialogId } from 'actions/action_dialog';

const ContactsItem = props => {
  const { 
    _id,
    avatar,
    firstName,
    surname
  } = props;
  const { contactId } = useSelector(state => state.contacts);

  const dispatch = useDispatch()
  const setContact = useCallback(id => dispatch(setContactId(id)), [dispatch]);
  const deleteId = useCallback(() => dispatch(deleteDialogId()), [dispatch]);

  useEffect(() => {
    if (contactId) {
      deleteId();
    }
  }, [contactId, deleteId]);

  return (
    <li
      className='dialog-wrap'
      onClick={() => setContact(_id)}
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