import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import DeletePanel from 'components/deletePanel';
import NavbarInfo from './navbar';

import './style.scss';
import 'style_components/skeleton/style.scss';

const Navbar = props => {
  const [showBar, setShowBar] = useState(true);
  const { isOpenPanel } = useSelector(state => state.deletePanel);
  const { dialogs } = useSelector(state => state.chatDialogs);

  const userId = props.match.params.id;

  return (
    <header className='navbar'>
      <CSSTransition
        in={ showBar }
        timeout={ 150 }
        classNames="come-down"
        unmountOnExit
      >
        <>
        {/* eslint-disable-next-line */}
          { dialogs.map(({author, partner, ...rest}) => {
            const keys = [partner._id, author._id];
            const user = author._id === userId ? author : partner;

            if (keys.includes(userId)) {
              return <NavbarInfo key={rest._id} data={ user } />
            }
          })}
        </>
      </CSSTransition>
      <CSSTransition
        in={ isOpenPanel }
        timeout={ 150 }
        classNames="climb-up"
        unmountOnExit
        onEnter={() => setShowBar(false)}
        onExited={() => setShowBar(true)}
      >
        <DeletePanel/>
      </CSSTransition>
    </header>
  )
};

export default Navbar;