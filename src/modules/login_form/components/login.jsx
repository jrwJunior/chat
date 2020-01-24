import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'antd';

import Field from '../../form_field';
import 'style_components/button/style.scss';

const Login = (props) => {
  const { isValid, isSubmitting, handleSubmit } = props;

  return (
    <Form className="login-form" onSubmit={ handleSubmit }>
      <Field
        id='email'
        type='email'
        placeholder="Email"
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

export default Login;