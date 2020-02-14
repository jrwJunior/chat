import * as actionTypes from 'constans';

const getFoundByUsers = data => {
  return {
    type: actionTypes.CONTACTS_REQUESTED,
    payload: data
  }
}

const setFoundUsers = data => {
  return {
    type: actionTypes.SET_FOUND_CONTACTS,
    payload: data
  }
}

const stopFindContacts = () => {
  return {
    type: actionTypes.CONTACTS_NOT_FOUND
  }
}

export {
  getFoundByUsers,
  setFoundUsers,
  stopFindContacts
}