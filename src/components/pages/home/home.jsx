import React from 'react';

import Message from 'components/message';
import Indicator from 'components/typing_indicator';
import Dialogs from 'components/dialogs';

const Home = () => {
  return (
    <>
      <Message/>
      <Indicator/>
      <Dialogs/>
    </>
  )
};

export default Home;