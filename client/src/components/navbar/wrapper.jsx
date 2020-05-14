import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import DeletePanel from 'components/deletePanel';
import NavbarInfo from './navbar';
import { getUser } from 'actions/action_user';

import './style.scss';
import 'style_components/skeleton/style.scss';

const Navbar = props => {
  const [showBar, setShowBar] = useState(true);

  const { dialogs, noDialogs } = useSelector(state => state.chatDialogs)
  const { isOpenPanel, user } = useSelector(state => ({
    isOpenPanel: state.deletePanel.isOpenPanel,
    user: state.user.user
  }));

  const dispatch = useDispatch();
  const getUserData = useCallback(id => dispatch(getUser(id)), [dispatch]);

  const userId = props.match.params.id;
  const isUser = !user || user._id !== userId;

  const userNotFoundDialogs = useMemo(() => {
    if (dialogs.length || noDialogs) {
      return dialogs.every(item => (
        item.author._id !== userId && item.partner._id !== userId
      ))
    }
  }, [dialogs, noDialogs, userId])

  useEffect(() => {
    if (userNotFoundDialogs && !user) {
      getUserData(userId);
    }
  }, [user, userId, getUserData, userNotFoundDialogs]);

  return (
    <header className='navbar'>
      <CSSTransition
        in={ showBar }
        timeout={ 150 }
        classNames="come-down"
        unmountOnExit
      >
        <>
          { dialogs.map(({author, partner, ...rest}) => {
            const keys = [partner._id, author._id];
            const user = author._id === userId ? author : partner;

            if (keys.includes(userId) && isUser) {
              return <NavbarInfo key={rest._id} data={ user } />
            }
          })}
          { isUser ? null : <NavbarInfo data={ user } /> }
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