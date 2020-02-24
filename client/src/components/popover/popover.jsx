import React, { useState } from 'react';
import { Popover, Button } from 'antd';

import { confirmDelete } from 'utils/helpers';
import './style.scss';

const PopoverBase = ({ children, deleteMessage, isMe }) => {
  const [ visible, setVisible ] = useState(false);

  const popoverContent = (
    <Button 
      className='btn-danger'
      size='small'
      type="link"
      onClick={ () => {
        setVisible(false);
        confirmDelete(deleteMessage);
      }}
    >
      Delete
    </Button>
  )

  return (
    <Popover
      content={ popoverContent }
      visible={ isMe && visible }
      onVisibleChange={ visible => setVisible(visible) }
      trigger="click"
    >
      { React.Children.map(children, child => (
        React.cloneElement(child, {
          style: { 
            opacity: isMe && visible ? '0.4' : false,
            cursor: isMe ? 'pointer' : 'default'
          }
        })
      ))}
    </Popover>
  )
};

export default PopoverBase;