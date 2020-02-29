import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import compareAsc from 'date-fns/compareAsc';

const MessageDate = ({ createdAt, id }) => {
  const [createdTodayMsg, setCreatedTodayMsg] = useState(false);

  const isTodayMessage = compareAsc(new Date().getDate(), new Date(createdAt).getDate());
  const msgId = JSON.parse(localStorage.getItem('today_id_msg')) || {};
  const isDate = new Date(createdAt);

  useEffect(() => {
    if (msgId.id === id) {
      setCreatedTodayMsg(true);
    }
    // eslint-disable-next-line
  });

  useEffect(() => {
    if (isTodayMessage > -1 && isTodayMessage < 1 && !localStorage['today_id_msg']) {
      localStorage.setItem('today_id_msg', JSON.stringify({id}));
      setCreatedTodayMsg(true);
    }
  }, [setCreatedTodayMsg, isTodayMessage, id]);

  if (createdTodayMsg) {
    if (isToday(isDate)) {
      return <div className='message-date'>Today</div>
    }

    return <div className='message-date'>{ format(isDate, 'MMMM dd') }</div>
  }

  if (isTodayMessage > 0 && !createdTodayMsg) {
    return <div className='message-date'>{ format(isDate, 'MMMM dd') }</div>
  }

  return null;
};

export default MessageDate;