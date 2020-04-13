import React, { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import uuidv5 from 'uuid/v5';
import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';
import { Badge } from 'antd';

import Avatar from 'components/avatar';
import Indicator from 'components/typing_indicator';

import { messageTimeConvert } from 'utils/helpers';
import { setDialogId } from 'actions/action_dialog';
import { APIMsg } from 'utils/api/msg';

import 'style_components/badge/style.scss';

const DialogsItem = props => {
  const {
    _id,
    user,
    authorizedUser,
    lastMessage
  } = props;
  const { typing } = useSelector(state => state.isTyping);
  const { count } = useSelector(state => state.notifi);
  const { dialogId } = useSelector(state => state.dialog);

  const paramsId = props.location.pathname.split('/im/p/').join('');
  const isActive = paramsId === user._id;

  const notMsgOwner = lastMessage.user._id !== authorizedUser._id;
  // const muteNotify = useMemo(() => localStorage['mute_notify'], []);

  const dispatch = useDispatch();
  const setIdDialog = useCallback(id => dispatch(setDialogId(id)), [dispatch]);
  const messageRead = useCallback(() => {
    if (!lastMessage.readed && notMsgOwner && isActive) {
      new APIMsg().getMessagesRead({dialogId: _id});
    }
    // eslint-disable-next-line
  }, [lastMessage]);

  useEffect(() => {
    if (paramsId === user._id && !dialogId) {
      console.log('effect')
      setIdDialog(_id);
    }

    // if (count > 0 && notMsgOwner && !muteNotify) {
    //   new Audio('/sound/sound_a.mp3').autoplay = 'true';
    //   localStorage.setItem('mute_notify', false);
    // }
    // eslint-disable-next-line
  }, [_id, paramsId, user, count, setIdDialog]);

  useEffect(() => {
    window.addEventListener('focus', messageRead);
  }, [messageRead]);

  return (
    <li 
      className={ classNames('dialog-wrap', 
        {'is-active': isActive}) 
      }
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
          {/* { online ? <span className='online-status'/> : null } */}
        </div>
        <div className='dialog-message_wrap'>
          <div className="dialog-head">{ `${user.firstName} ${user.surname}` }</div>
          { typing ? <Indicator/> : (
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
          { lastMessage.user._id !== user._id ? (
            lastMessage.readed ? <span className='icon-readed readed icon-blue' style={{marginTop: '2px'}}/> : <span className='icon-noread readed icon-blue' style={{marginTop: '2px'}}/>
          ) : null }
          { notMsgOwner && count > 0 ? (
            <div className='notif-badge'>
              <Badge className='unread-msg_badge' count={count}/>
            </div>
          ) : null }
        </div>
      </Link>
    </li>
  )
};

export default withRouter(DialogsItem);