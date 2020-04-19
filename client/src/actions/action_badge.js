import * as actionTypes from 'constans';

const notifBadge = data => {
  return {
    type: actionTypes.NOTIF_BADGE,
    payload: data
  }
}

const deleteNotifBadge = data => {
  return {
    type: actionTypes.DELETE_NOTIF_BADGE,
    payload: data
  }
}

export {
  notifBadge,
  deleteNotifBadge
}