import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../button';
import { Form, Input } from 'antd';

import '../style.scss';

const Login = () => {
  return (
    <Form className="login-form">
      <Form.Item>
        <Input
          type='email'
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary" 
          size='large'
          className='btn-base'
          htmlType="submit"
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