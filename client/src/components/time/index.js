import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

const Time = ({ created_at }) => (
  <>
    { formatDistanceToNow(
      new Date(created_at), 
      { addSuffix: true, locale: ruLocale }
    )}
  </>
);

export default Time;