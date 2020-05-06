import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import uuidv5 from 'uuid/v5';
import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';
import { Badge } from 'antd';

import Avatar from 'components/avatar';
import Indicator from 'components/typing_indicator';
import EmptyItem from './empty';

import { messageTimeConvert } from 'utils/helpers';
import { usePrevious } from 'utils/hooks';
import { APIMsg } from 'utils/api/msg';
import { setDialogId } from 'actions/action_dialog';
import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';

import 'style_components/badge/style.scss';

const DialogsItem = props => {
  const {
    _id,
    user,
    authorizedUser,
    lastMessage
  } = props;

  const { typing, senderUserId } = useSelector(state => state.isTyping);
  const { unreadMessages } = useSelector(state => state.notifi);
  const { dialogId } = useSelector(state => state.dialog);
  const { userOnline } = useSelector(state => state.onlineStatus);

  const prevProps = usePrevious(_id);

  const paramsId = props.location.pathname.split('/im/p/').join('');
  const isActive = paramsId === user._id;
  const isAuthorMsg = !!lastMessage && lastMessage.user._id !== authorizedUser._id;

  const dispatch = useDispatch();
  const setIdDialog = useCallback(id => dispatch(setDialogId(id)), [dispatch]);
  const messageRead = useCallback(() => {
    if (!!lastMessage && !lastMessage.readed && isAuthorMsg && isActive) {
      new APIMsg().getMessagesRead({dialogId: _id});
    }
    // eslint-disable-next-line
  }, [lastMessage]);
  
  useEffect(() => {
    if (prevProps !== _id) {
      socket.emit(socketEvents.DIALOG_JOIN, _id);
    }

    window.addEventListener('focus', messageRead);
  }, [_id, messageRead, prevProps]);

  useEffect(() => {
    if (paramsId === user._id && !dialogId) {
      setIdDialog(_id);
    }
    // eslint-disable-next-line
  }, [_id, setIdDialog]);

  if (!lastMessage) {
    return (
      <EmptyItem
        user={ user }
        id={ _id }
        active={ isActive }
        userOnline={userOnline}
      />
    )
  }

  return (
    <li 
      className={ classNames('dialog-wrap', 
        {'is-active': isActive}) 
      }
      onClick={() => setIdDialog(_id)}
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
          { (typing && senderUserId === _id) ? <Indicator/> : (
            <>
              {lastMessage.user._id !== user._id ? <span style={{color: '#4ba1ff'}}>You:&nbsp;</span> : null}
              {reactStringReplace(lastMessage.message, /:(.+?):/g, match => (
                <Emoji key={ uuidv5('guys.example.com', uuidv5.DNS) } emoji={match} set='messenger' size={16} />
              ))}
            </>
          )}
        </div>
        <div className="dialog-meta">
          <div className="dialog-date">{ messageTimeConvert(lastMessage.createdAt) }</div>
          {lastMessage.user._id !== user._id ? (
            lastMessage.readed ? <span className='icon-readed readed icon-blue' style={{marginTop: '2px'}}/> : <span className='icon-noread readed icon-blue' style={{marginTop: '2px'}}/>
          ) : null }
          {isAuthorMsg && unreadMessages.map((item, idx) => (
            <div className='notif-badge' key={ uuidv5(idx.toString(), uuidv5.DNS) }>
              { item.id.includes(_id) && <Badge className='unread-msg_badge' count={item.count}/> }
            </div>
          ))}
        </div>
      </Link>
    </li>
  )
};

DialogsItem.propTypes = {
  _id: PropTypes.string,
  user: PropTypes.object,
  authorizedUser: PropTypes.object,
  lastMessage: PropTypes.object
}

export default withRouter(DialogsItem);