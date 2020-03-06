import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Spin, Icon } from 'antd';

import Field from 'modules/form_field';
import { useAuthentication } from 'utils/hooks';
import 'style_components/button/style.scss';

const Login = props => {
  const { isValid, isSubmitting, handleSubmit, setSubmitting } = props;
  const { isLoading } = useSelector(state => state.user_auth);

  const antIcon = <Icon type="loading" style={{ fontSize: 25 }} spin />;
  useAuthentication(isSubmitting, setSubmitting, props.history);

  return (
    <Form className="login-form" onSubmit={ handleSubmit }>
      <Field
        id='email'
        type='email'
        placeholder="Email"
        allowClear
        { ...props }
      />
      <Field
        id='password'
        type='password'
        placeholder="password"
        { ...props }
      />
      <Form.Item>
        <Button
          type="primary" 
          size='large'
          htmlType="submit"
          className='btn-base'
          disabled={ !isValid || isSubmitting }
        >
          Log in
          { isLoading ? <Spin style={{ left: 'auto', right: '15px' }} indicator={antIcon} /> : null }
        </Button>
        <Button
          type="primary" 
          size='large'
          className='btn-base btn-secondary'
        >
          <Link to='/register'>
            Create New Account
          </Link>
        </Button>
      </Form.Item>
    </Form>
  )
};

Login.propTypes = {
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  setSubmitting: PropTypes.func
}

export default Login;