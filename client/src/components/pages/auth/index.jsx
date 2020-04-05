import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Typography, Alert } from 'antd';

import { LoginForm, RegisterForm } from 'modules';
import ImgWithFallback from 'components/imgWithFallback';
import Logo from 'components/logo';

import { clearError } from 'actions/action_auth';
import { usePrevious } from 'utils/hooks/usePrevious';
import { showNotify } from 'utils/helpers';

import './style.scss';
import image from 'img/main-bg.webp';
import fallback from 'img/main-bg.jpg';

const { Title, Text } = Typography;

const Auth = ({ location }) => {
  const { error, status } = useSelector(state => state.user_auth);
  const prevPath = usePrevious(location.pathname);

  const dispatch = useDispatch();
  const setInitialState = useCallback(() => dispatch(clearError()), [dispatch]);

  useEffect(() => {
    if (prevPath !== location.pathname && error) {
      setInitialState();
    }
  });

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
    <>
      <header className='header'>
        <div className='container'>
          <Logo/>
        </div>
      </header>
      <div className='auth-container'>
        <div className='wrapper-auth'>
          <Title>Be together, whenever.</Title>
          <div style={{display: 'flex'}}>
            <Text className='text'>An simple way to messaging<br/> all in one place.</Text>
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
        <ImgWithFallback
          src={ image }
          fallback={ fallback }
          alt=''
        />
      </div>
    </>
  );
};

Auth.propTypes = {
  location: PropTypes.object
}

export default withRouter(Auth);