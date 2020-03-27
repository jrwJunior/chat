import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Skeleton } from 'antd';

import DeletePanel from 'components/deletePanel';
import NavbarInfo from './info';

import './style.scss';
import 'style_components/skeleton/style.scss';

const Navbar = () => {
  const [showInfoPanel, setShowInfoPanel] = useState(true);

  // const { loading } = useSelector(state => state.chatDialogs);
  const { isOpenPanel } = useSelector(state => state.deletePanel);
  const { user, loading } = useSelector(state => state.user);

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
        >
          <NavbarInfo data={ user } />
        </CSSTransition>
        <CSSTransition
          in={ isOpenPanel }
          timeout={ 150 }
          classNames="climb-up"
          unmountOnExit
          onEnter={() => setShowInfoPanel(false)}
          onExited={() => setShowInfoPanel(true)}
        >
          <DeletePanel/>
        </CSSTransition>
      </Skeleton>
    </header>
  )
};

export default Navbar;