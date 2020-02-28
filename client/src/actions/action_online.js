import * as actionTypes from 'constans';

const userIsOnline = online => {
  return {
    type: actionTypes.SET_ONLINE,
    payload: online
  }
}

const userLastSeen = lastSeen => {
  return {
    type: actionTypes.SET_LAST_SEEN,
    payload: lastSeen
  }
}

export {
  userIsOnline,
  userLastSeen
}