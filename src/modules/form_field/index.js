import React from 'react';
import classNames from 'classnames';

import { Input, Form } from 'antd';

const { Item } = Form;

const Field = props => {
  const { id, type, placeholder, ...rest } = props;
  const attrs = { id, type, placeholder };
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
  } = rest;

  return (
    <Item
      hasFeedback
      validateStatus={ classNames({ 'error': errors[id] && touched[id], 'success': !errors[id] && touched[id] }) }
      help={ errors[id] && touched[id] && errors[id] }
    >
      <Input
        { ...attrs }
        value={values[id]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Item>
  )
};

export default Field;