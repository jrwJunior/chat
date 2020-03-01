import React, { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import DeletePanel from 'components/deletePanel';
import NavbarInfo from './info';

import { getUsersDialog } from 'utils/helpers';
import { usePrevious } from 'utils/hooks';

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
  const [showDelPanel, setDelPanel] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const { dialogs, loading } = useSelector(state => state.chatDialogs);
  const { isOpenPanel } = useSelector(state => state.deletePanel);
  const prevProps = usePrevious(isOpenPanel);

  const partnerId = props.location.pathname.split('/p/').join('');
  const dialog = useMemo(() => getUsersDialog(dialogs, partnerId), [dialogs, partnerId]);
  const partner = foo(dialog, partnerId);

  useEffect(() => {
    if (isOpenPanel) {
      setDelPanel(true);
    }
  }, [isOpenPanel, setDelPanel]);

  useEffect(() => {
    if (!!prevProps !== isOpenPanel && !isOpenPanel) {
      setDelPanel(false);
    }
  }, [isOpenPanel, prevProps, setShowInfoPanel]);

  return (
    <header className='navbar'>
      <Skeleton 
        loading={ loading } 
        active 
        avatar 
        title={{width: '150px'}}
        paragraph={{rows: 1, width: '200px'}}
      >
        <CSSTransition
          in={ showInfoPanel }
          timeout={ 150 }
          classNames="come-down"
          unmountOnExit
          onEnter={() => setDelPanel(false)}
          onExited={() => setDelPanel(true)}
        >
          <NavbarInfo partner={partner}/>
        </CSSTransition>
        <CSSTransition
          in={ showDelPanel }
          timeout={ 150 }
          classNames="climb-up"
          unmountOnExit
          onEnter={() => setShowInfoPanel(false)}
          onExited={() => setShowInfoPanel(true)}
        >
          <>
            { dialog && <DeletePanel dialogId={ dialog._id }/> }
          </>
        </CSSTransition>
      </Skeleton>
    </header>
  )
};

export default withRouter(Navbar);