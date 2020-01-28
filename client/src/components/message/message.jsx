import React from 'react';
import { Typography } from 'antd';

import Avatar from 'components/avatar';
import Time from 'components/time';
import './style.scss';

const { Text } = Typography;

const Message = props => {
  const { text, user, created_at } = props;

  return (
    <div className='message'>
      <div className="message-author">
        <Avatar 
          userName={ user.fullname }
          avatar={ user.avatar }
          size={ 30 }
        />
      </div>
      <div className="message-content">
        <div className="message-bubble">
          <Text className='text-color_white'>{ text }</Text>
        </div>
        <div className='message-create_date'>
          <Time
            created_at={ created_at }
          />
        </div>
      </div>
    </div>
  )
};

export default Message;