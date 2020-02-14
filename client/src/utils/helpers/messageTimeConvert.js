import format from 'date-fns/format';
import isToday from 'date-fns/isToday';

export default (created_at) => {
  const isDate = new Date(created_at);

  if (isToday(isDate)) {
    return format(isDate, 'H:mm')
  }

  return format(isDate, 'dd.MM.yy')
}