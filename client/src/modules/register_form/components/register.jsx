import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Icon, Spin } from 'antd';

import Field from '../../form_field';
// import { useAuth } from 'utils/hooks';
import 'style_components/button/style.scss';

const Register = props => {
  const { isValid, isSubmitting, history, setSubmitting, handleSubmit } = props;
  const { isLoading } = useSelector(state => state.user_auth);

  const antIcon = <Icon type="loading" style={{ fontSize: 25 }} spin />;

  // useAuth(isSubmitting, setSubmitting, history);

  return (
    <Form className="register-form" onSubmit={ handleSubmit }>
      <Field
        id='email'
        type='email'
        placeholder="Email"
        allowClear
        { ...props }
      />
      <Field
        id='firstName'
        type='text'
        placeholder="First Name"
        allowClear
        { ...props }
      />
      <Field
        id='surname'
        type='text'
        placeholder="Surname"
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
          className='btn-base'
          htmlType="submit"
          disabled={ !isValid || isSubmitting }
        >
          Create Account
          { isLoading ? <Spin style={{ left: 'auto', right: '15px' }} indicator={antIcon} /> : null }
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