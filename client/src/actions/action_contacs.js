import * as actionTypes from 'constans';

const getFoundUsers = data => {
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

const deleteSelectedContact = () => {
  return {
    type: actionTypes.DELETE_SELECTED_CONTACT
  }
}

export {
  getFoundUsers,
  setFoundUsers,
  deleteSelectedContact
}