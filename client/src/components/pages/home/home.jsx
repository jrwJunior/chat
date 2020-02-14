import React, { useEffect, useCallback } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Dialogs from 'components/dialogs';
import Navbar from 'components/navbar';
import HistoryMessages from 'components/messages';

import { isEmpty } from 'utils/helpers';
import { getUserData } from 'actions/action_user';

import './style.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user_auth);
  const getUser = useCallback(() => dispatch(getUserData()), [dispatch]);

  useEffect(() => {
    if (isEmpty(userData)) {
      getUser();
    }
  }, [getUser, userData]);

  return (
    <div className='layout'>
      <Dialogs/>
      <main className='content'>
        <Navbar/>
        <Route
          path='/p/:id'
          component={ HistoryMessages }
        />
      </main>
    </div>
  )
};

export default Home;