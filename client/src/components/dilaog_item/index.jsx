import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import uuidv5 from 'uuid/v5';
import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';

import Avatar from 'components/avatar';
import Indicator from 'components/typing_indicator';

import { messageTimeConvert, getPartnerData } from 'utils/helpers';
import { useOnlineStatus } from 'utils/hooks';
import { setDialogId } from 'actions/action_dialogs';
import { setDialogPartner } from 'actions/action_dialogPartner';

const DialogsItem = props => {
  const {
    _id,
    owner,
    interlocutor,
    lastMessage,
    isTyping,
    location
  } = props;
  
  const { userData } = useSelector(state => state.user_auth);

  const partner = getPartnerData({interlocutor, owner, userData});
  const isSelectedDialog = location.pathname.split('/p/').join('') === partner._id;
  const { online } = useOnlineStatus('guys');

  const dispatch = useDispatch();
  const $setDialogId = useCallback(id => dispatch(setDialogId(id)), [dispatch]);
  const $setDialogPartner = useCallback(partner => dispatch(setDialogPartner(partner)), [dispatch]);

  useEffect(() => {
    if (isSelectedDialog) {
      $setDialogId(_id);
      $setDialogPartner(partner);
    }
  }, [isSelectedDialog, _id, partner, $setDialogId, $setDialogPartner]);

  return (
    <li 
      className={ classNames('dialog-wrap', 
        {'is-active': isSelectedDialog}) 
      }
    >
      <Link
        to={`/p/${partner._id}`}
        className='dialog'
      >
        <div className='dialog-photo'>
          <div className='dialog-photo_inner'>
            <Avatar
              userName={ partner.firstName }
              avatar={ partner.avatar }
              size={ 40 }
            />
          </div>
          { online ? <span className='online-status'/> : null }
        </div>
        <div className='dialog-message_wrap'>
          <div className="dialog-head">{ `${partner.firstName} ${partner.surname}` }</div>
          { isTyping ? <Indicator/> : (
            <>
              {(lastMessage.user._id || lastMessage.user) !== partner._id ? <span style={{color: '#4ba1ff'}}>You:&nbsp;</span> : null}
              {reactStringReplace(lastMessage.message, /:(.+?):/g, match => (
                <Emoji key={ uuidv5('guys.example.com', uuidv5.DNS) } emoji={match} set='messenger' size={16} />
              ))}
            </>
          )}
        </div>
        <div className="dialog-meta">
          <div className="dialog-date">{ messageTimeConvert(lastMessage.createdAt) }</div>
        </div>
      </Link>
    </li>
  )
};

export default withRouter(DialogsItem);