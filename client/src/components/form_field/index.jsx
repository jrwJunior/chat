import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Input, Form } from 'antd';

const { Item } = Form;
const { Password } = Input;

const Field = props => {
  const { id, type, placeholder, allowClear, ...rest } = props;
  const attrs = { id, type, placeholder, allowClear };
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur
  } = rest;

  return (
    <Item
      validateStatus={ classNames({ 'error': errors[id] && touched[id], 'success': !errors[id] && touched[id] }) }
      help={ touched[id] && errors[id] }
    >
      {/* eslint-disable-next-line */}
      { id == 'password' ? (
        <Password
          { ...attrs }
          value={values[id]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <Input
          { ...attrs }
          value={values[id]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      )}
    </Item>
  )
};

Field.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
}

export default Field;