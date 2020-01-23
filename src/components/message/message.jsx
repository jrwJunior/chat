import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';
import { Typography } from 'antd';

import './style.scss';
import avatar from  'img/79030657_175377713578426_6336390883977256068_n.jpg';

const { Text } = Typography;

const Message = () => {
  return (
    <div className='message'>
      <div className="message-author">
        <img src={ avatar } alt=""/>
      </div>
      <div className="message-content">
        <div className="message-bubble">
          <Text className='text-color_white'>Салам, Брут! Чё, как, уничтожил флот галлов? 🖐🏻</Text>
        </div>
        <div className='message-create_date'>
          { formatDistanceToNow(new Date('Thu Jan 23 2020 14:00:15'), {includeSeconds: true, addSuffix: true, locale: ruLocale}) }
        </div>
      </div>
    </div>
  )
};

export default Message;