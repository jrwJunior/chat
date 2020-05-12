import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Avatar from 'components/avatar';
import { deleteDialogId } from 'actions/action_dialog';
import { setUserDialog } from 'actions/action_user';

const ContactsItem = props => {
  const { 
    _id,
    avatar,
    firstName,
    surname
  } = props;
  const { user } = useSelector(state => state.user);

  const dispatch = useDispatch()
  const setUser = useCallback(data => dispatch(setUserDialog(data)), [dispatch]);
  const deleteId = useCallback(() => dispatch(deleteDialogId()), [dispatch]);

  useEffect(() => {
    if (user) {
      deleteId();
    }
  }, [user, deleteId]);

  return (
    <li
      className='dialog-wrap'
      onClick={() => setUser({_id,avatar,firstName,surname})}
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