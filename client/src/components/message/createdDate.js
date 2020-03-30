import React from 'react';
import isToday from 'date-fns/isToday';
import format from 'date-fns/format';

const createdDateMsg = ({createdDate, createdAt}) => {
  if (createdDate) {
    if (isToday(new Date(createdAt))) {
      return <div className='message-date'>Today</div>
    }

    return <div className='message-date'>{ format(new Date(createdAt), 'MMMM dd') }</div>
  }

  return null;
}

export default createdDateMsg;