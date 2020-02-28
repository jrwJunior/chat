import React, { useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import Indicator from 'components/typing_indicator';
import Avatar from 'components/avatar';

import { userLastSeen } from 'utils/helpers';
import { getUsersDialog } from 'utils/helpers';
import { useOnlineStatus } from 'utils/hooks';

import './style.scss';
import 'style_components/skeleton/style.scss';

const foo = (dialog, partnerId) => {
  if (!dialog) {
    return {};
  }
  // eslint-disable-next-line
  return Object.values(dialog).find(item => {
    if (typeof item !== 'string' && item.hasOwnProperty('_id')) {
      return item._id === partnerId;
    }
  });
}

const Navbar = props => {
  const { typing } = useSelector(state => state.typingMessage);
  const { dialogs, loading } = useSelector(state => state.chat_dialogs);

  const partnerId = props.location.pathname.split('/p/').join('');
  const dialog = useMemo(() => getUsersDialog(dialogs, partnerId), [dialogs, partnerId]);
  const { online, lastSeen } = useOnlineStatus('guys');
  const partner = foo(dialog, partnerId);

  return (
    <header className='navbar'>
      <Skeleton 
        loading={ loading } 
        active 
        avatar 
        title={{width: '150px'}} 
        paragraph={{rows: 1, width: '200px'}}
      >
        <div className='navbar-profile'>
          <Avatar
            userName={ partner.firstName }
            avatar={ partner.avatar }
            size={ 35 }
          />
          <div className='navbar-profile_title'>
            { `${partner.firstName} ${partner.surname}` }
            { typing ? <Indicator/> : (
              <div 
                className='profile-status' 
                style={{ color: !online ? '#a9a9a9' : false }}
              >
                { online ? 'online' : userLastSeen(lastSeen || partner.last_seen)}
              </div>
            )}
          </div>
        </div>
      </Skeleton>
    </header>
  )
};

export default withRouter(Navbar);