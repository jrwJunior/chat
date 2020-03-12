import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Typography, Alert } from 'antd';

import { LoginForm, RegisterForm } from 'modules';

import { clearError } from 'actions/action_auth';
import { usePrevious } from 'utils/hooks/usePrevious';
import { showNotify } from 'utils/helpers';

import './style.scss';

const { Title, Text } = Typography;

const Auth = ({ location }) => {
  const { error, status } = useSelector(state => state.user_auth);
  const prevPath = usePrevious(location.pathname);

  const dispatch = useDispatch();
  const setInitialState = useCallback(() => dispatch(clearError()), [dispatch]);

  if (prevPath !== location.pathname && error) {
    setInitialState();
  }

  useEffect(() => {
    if (status !== 'success') {
      document.body.classList.add('no-logged');
    }

    if (status === 'success') {
      showNotify({type: status});
      document.body.classList.add('loggedIn');
    }
  }, [status]);

  return (
    <div className='auth-container'>
      <div className='wrapper-auth'>
        <Title>Be together, whenever.</Title>
        <div style={{display: 'flex'}}>
          <Text className='text'>A simple way to text</Text>
        </div>
        <Switch>
          <Route exact path='/login' component={ LoginForm } />
          <Route path='/register' component={ RegisterForm } />
        </Switch>
        { !!error ? (
          <Alert
            type="error"
            message={ error }
            closable
          />
        ) : null}
      </div>
      <div className='scene-hero' />
    </div>
  );
};

Auth.propTypes = {
  location: PropTypes.object
}

export default withRouter(Auth);