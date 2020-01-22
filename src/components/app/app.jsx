import React from 'react';
import routes from '../../routes';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const App = () => {
  const authRoutes = routes();

  return (
    <div className="container">
      <div className='auth-container'>
        <Title>Be together, whenever.</Title>
        <Text className='text'>A simple way to text, audio chat and plan things all in one place.</Text>
        { authRoutes }
      </div>
      <div className='scene-hero' />
    </div>
  );
}

export default App;
