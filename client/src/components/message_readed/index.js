import React from 'react';
import './style.scss';

const Readed = ({readed}) => {
  if (readed) {
    return <span className='readed-message readed-icon'/>
  }

  return <span className='readed-message readed-icon-no'/>
}

export default Readed;