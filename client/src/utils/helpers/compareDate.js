import compareAsc from 'date-fns/compareAsc';

const compareDate = (a, b) => {
  const compare = compareAsc(new Date(a).getDate(), new Date(b).getDate());

  if (compare > 0 || compare < 0) {
    return true
  }

  return false;
}

export default compareDate;