import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import { Skeleton } from 'antd';

import Avatar from 'components/avatar';

const { Title } = Typography;

const DialogsBanner = () => {
  const { userData, loading } = useSelector(state => state.user_auth);

  return (
    <div className='dialog-banner'>
      <Skeleton 
        loading={ loading } 
        active
        avatar 
        title={{width: '100px'}} 
        paragraph={{rows: 0}}
      >
        <Avatar
          userName={ userData.firstName }
          avatar={ userData.avatar }
          size={ 35 }
        />
        <Title level={ 3 }>Chats</Title>
      </Skeleton>
    </div>
  )
};

export default DialogsBanner;