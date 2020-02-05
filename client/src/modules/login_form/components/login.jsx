import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Spin, Icon } from 'antd';

import Field from 'modules/form_field';
import { useAuth } from 'utils/hooks';
import 'style_components/button/style.scss';

const Login = props => {
  const { isValid, isSubmitting, handleSubmit, setSubmitting } = props;
  const { isLoading } = useSelector(state => state.user_auth);
  const isAunthenticated = useAuth(isSubmitting, setSubmitting);

  const antIcon = <Icon type="loading" style={{ fontSize: 25 }} spin />;

  // useClearError(setInitialState, error);
  
  if (isAunthenticated) {
    props.history.push('/');
  }

  return (
    <>
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
    </>
  )
};

export default Login;