import React from 'react';
import { Typography } from 'antd';

import Time from 'components/time';
import './style.scss';

const { Text } = Typography;

const Message = () => {
  return (
    <div className='message'>
      <div className="message-author">
        <img src='https://instagram.fdnk1-2.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/79030657_175377713578426_6336390883977256068_n.jpg?_nc_ht=instagram.fdnk1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=xv-nZi9t86YAX-7pAWh&oh=e5fc282c998d22500053725c58d5746e&oe=5ED7F205' alt=""/>
      </div>
      <div className="message-content">
        <div className="message-bubble">
          <Text className='text-color_white'>Салам, Брут! Чё, как, уничтожил флот галлов? 🖐🏻</Text>
        </div>
        <div className='message-create_date'>
          <Time/>
        </div>
      </div>
    </div>
  )
};

export default Message;