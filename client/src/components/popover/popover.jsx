import React, { useState } from 'react';
import { Popover, Button } from 'antd';

import { confirmDelete } from 'utils/helpers';
import './style.scss';

const PopoverBase = ({ children, removeMessage }) => {
  const [ visible, setVisible ] = useState(false);

  const popoverContent = (
    <Button 
      className='btn-danger'
      size='small'
      type="link"
      onClick={ () => {
        setVisible(false);
        confirmDelete(removeMessage)
      }}
    >
      Delete
    </Button>
  )

  return (
    <Popover
      content={ popoverContent }
      visible={ visible }
      onVisibleChange={ visible => setVisible(visible) }
      trigger="click"
    >
      { children }
    </Popover>
  )
};

export default PopoverBase;