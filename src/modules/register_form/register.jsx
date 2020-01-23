import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import 'style_components/button/style.scss';

const Register = () => {
  return (
    <Form className="register-form">
      <Form.Item>
        <Input
          type='email'
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="text"
          placeholder="First Name"
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="text"
          placeholder="Last Name"
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="text"
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
          Create Account
        </Button>
        <Link 
          to='/login'
          className='form-link'
        >
          Already Have an Account
        </Link>
      </Form.Item>
    </Form>
  )
}

export default Register;