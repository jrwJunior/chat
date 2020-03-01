import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Skeleton } from 'antd';

import DeletePanel from 'components/deletePanel';
import NavbarInfo from './info';

import { usePrevious } from 'utils/hooks';

import './style.scss';
import 'style_components/skeleton/style.scss';

const Navbar = () => {
  const [showDelPanel, setDelPanel] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(true);

  const { loading } = useSelector(state => state.chatDialogs);
  const { isOpenPanel } = useSelector(state => state.deletePanel);
  const { dialogPartner } = useSelector(state => state.dialogPartner);
  const prevProps = usePrevious(isOpenPanel);

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
          <>
          { dialogPartner && <NavbarInfo partner={dialogPartner}/>}
          </>
        </CSSTransition>
        <CSSTransition
          in={ showDelPanel }
          timeout={ 150 }
          classNames="climb-up"
          unmountOnExit
          onEnter={() => setShowInfoPanel(false)}
          onExited={() => setShowInfoPanel(true)}
        >
          <DeletePanel />
        </CSSTransition>
      </Skeleton>
    </header>
  )
};

export default Navbar;