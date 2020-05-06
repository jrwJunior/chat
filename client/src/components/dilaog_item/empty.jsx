import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Avatar from 'components/avatar';
import { setDialogId } from 'actions/action_dialog';

const EmptyItem = ({
  user,
  id,
  active,
  userOnline
}) => {
  const dispatch = useDispatch();
  const setIdDialog = useCallback(id => dispatch(setDialogId(id)), [dispatch]);

  return (
    <li 
      className={ classNames('dialog-wrap', 
        {'is-active': active}) 
      }
      onClick={() => setIdDialog(id)}
    >
      <Link
        to={`/im/p/${user._id}`}
        className='dialog'
      >
        <div className='dialog-photo'>
          <div className='dialog-photo_inner'>
            <Avatar
              userName={ user.firstName }
              avatar={ user.avatar }
              size={ 40 }
            />
          </div>
          { userOnline.includes(user._id) ? <span className='online-status'/> : null }
        </div>
        <div className='dialog-message_wrap'>
          <div className="dialog-head">{ `${user.firstName} ${user.surname}` }</div>
        </div>
      </Link>
    </li>
  )
};

EmptyItem.propTypes = {
  user: PropTypes.object, 
  id: PropTypes.string,
  active: PropTypes.bool,
  userOnline: PropTypes.array
}

export default EmptyItem;