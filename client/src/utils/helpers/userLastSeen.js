import format from 'date-fns/format';
import isToday from 'date-fns/isToday';

export default (created_at) => {
  const isDate = new Date(created_at);

  if (!created_at) {
    return;
  }

  if (isToday(isDate)) {
    return `last seen today at ${format(isDate, 'H:mm')}`;
  }

  return `last seen ${format(isDate, 'MMM dd')} at ${format(isDate, 'H:mm')}`;
}