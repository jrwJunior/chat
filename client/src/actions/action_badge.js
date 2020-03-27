import * as actionTypes from 'constans';

const notifBadge = data => {
  return {
    type: actionTypes.NOTIF_BADGE,
    payload: data
  }
}

const deleteNotifBadge = () => {
  return {
    type: actionTypes.DELETE_NOTIF_BADGE
  }
}

export {
  notifBadge,
  deleteNotifBadge
}