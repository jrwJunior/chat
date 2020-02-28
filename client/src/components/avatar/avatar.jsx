import React from 'react';
import { Avatar } from 'antd';

import { creatingAvatarsWithColors } from 'utils/helpers';

export default ({ userName = '', avatar, size }) => {
  const { color } = creatingAvatarsWithColors(userName);

  if (!avatar) {
    return (
      <Avatar
        style={{ backgroundColor: color }}
        size={ size }
      >
        { userName.slice(0, 1) }
      </Avatar>
    )
  }

  return (
    <Avatar src={ avatar } size={ size }/>
  )
};