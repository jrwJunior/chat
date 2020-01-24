import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'antd';

import Field from '../../form_field';
import 'style_components/button/style.scss';

const Register = props => {
  const { isValid, isSubmitting } = props;

  return (
    <Form className="register-form">
      <Field
        id='email'
        type='email'
        placeholder="Email"
        { ...props }
      />
      <Field
        id='firstName'
        type='text'
        placeholder="First Name"
        { ...props }
      />
      <Field
        id='surname'
        type='text'
        placeholder="Surname"
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
          className='btn-base'
          htmlType="submit"
          disabled={ !isValid || isSubmitting }
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