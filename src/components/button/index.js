import React from 'react';
import { Button } from 'antd';

import './style.scss';

const BaseButton = props => {
  return (
    <Button
      { ...props }
    >
      { props.children }
    </Button>
  )
};

export default BaseButton;