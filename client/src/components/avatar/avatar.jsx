import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import { creatingAvatarsWithColors } from 'utils/helpers';

const BaseAvatar = ({ userName = '', avatar, size }) => {
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

BaseAvatar.propTypes = {
  userName: PropTypes.string,
  avatar: PropTypes.string,
  size: PropTypes.number
}

export default BaseAvatar;