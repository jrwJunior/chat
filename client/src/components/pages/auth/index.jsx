import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Typography, Alert } from 'antd';

import { LoginForm, RegisterForm } from 'modules';
import ImgWithFallback from 'components/imgWithFallback';
import Logo from 'components/logo';
import UploadAvatar from 'components/uploadFile';

import { clearError } from 'actions/action_auth';
import { usePrevious } from 'utils/hooks/usePrevious';
import { showNotify } from 'utils/helpers';

import './style.scss';
import image from 'img/main-bg.webp';
import fallback from 'img/main-bg.jpg';

const { Title, Text } = Typography;

const Auth = ({ location }) => {
  const { error, status } = useSelector(state => state.authUser);
  const prevPath = usePrevious(location.pathname);

  const dispatch = useDispatch();
  const clearErrorData = useCallback(() => dispatch(clearError()), [dispatch]);

  const titles = () => {
    if (location.pathname === '/login') {
      return <Text className='text'>An simple way to messaging<br/> all in one place.</Text>
    }

    return <Text className='text'>Please enter your name and<br/> upload a photo.</Text>
  }

  useEffect(() => {
    if (prevPath !== location.pathname && error) {
      clearErrorData();
    }
  });

  useEffect(() => {
    if (status === 'success') {
      showNotify({type: status});
      document.body.classList.add('loggedIn');
    } else {
      document.body.classList.remove('loggedIn');
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
            { titles() }
          </div>
          { location.pathname === '/register' ? (
            <UploadAvatar/>
          ): null }
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