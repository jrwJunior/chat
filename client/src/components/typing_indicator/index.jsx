import React from 'react';

import './style.scss';

const Indicator = () => {
  return (
    <div className='indicator'>
      <span className="typing-dot"/>
      <span className="typing-dot"/>
      <span className="typing-dot"/>
      <span className='typing-text'>typing</span>
    </div>
  )
};

export default Indicator;