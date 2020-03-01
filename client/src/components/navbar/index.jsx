import React, { useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import DeletePanel from 'components/deletePanel';
import NavbarInfo from './info';

import { getUsersDialog } from 'utils/helpers';

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
  const { dialogs, loading } = useSelector(state => state.chatDialogs);
  const { isOpenPanel } = useSelector(state => state.deletePanel);

  const partnerId = props.location.pathname.split('/p/').join('');
  const dialog = useMemo(() => getUsersDialog(dialogs, partnerId), [dialogs, partnerId]);
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
        { isOpenPanel ? <DeletePanel dialogId={ dialog._id }/> : <NavbarInfo partner={partner}/>}
      </Skeleton>
    </header>
  )
};

export default withRouter(Navbar);