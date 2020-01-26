import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

const Time = () => (
  <>
    { formatDistanceToNow(
      new Date('Thu Jan 23 2020 14:00:15'), 
      {includeSeconds: true, addSuffix: true, locale: ruLocale}
    )}
  </>
);

export default Time;