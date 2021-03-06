const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const REGISTER_REQUESTED = 'REGISTER_REQUESTED';
const LOG_OUT = 'LOG_OUT';

const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';
const DELETE_USER = 'DELETE_USER';
const GET_AUTHORIZED_USER = 'GET_AUTHORIZED_USER';
const SET_AUTHORIZED_USER = 'SET_AUTHORIZED_USER';

const CONTACTS_REQUESTED = 'CONTACTS_REQUESTED';
const SET_FOUND_CONTACTS = 'SET_FOUND_CONTACTS';
const SET_CONTACT_ID = 'SET_CONTACT_ID';
const DELETE_SELECTED_CONTACT = 'DELETE_SELECTED_CONTACT';

const CLEAR_ERROR_USER = 'CLEAR_ERROR_USER';

const DEALOGS_REQUESTED = 'DEALOGS_REQUESTED';
const DIALOGS_LOAD_SUCCESS = 'DIALOGS_LOAD_SUCCESS';
const SET_DIALOG = 'SET_DIALOG';
const SET_DIALOG_ID = 'SET_DIALOG_ID';
const DELETE_DIALOG_ID = 'DELETE_DIALOG_ID';

const MESSAGES_REQUESTED = 'MESSAGES_REQUESTED';
const MESSAGES_LOAD_SUCCESS = 'MESSAGES_LOAD_SUCCESS';
const SET_LAST_MESSAGE = 'SET_LAST_MESSAGE';
const CREATED_MESSAGE = 'CREATED_MESSAGE';
const SET_MESSAGE = 'SET_MESSAGE';
const SET_MESSAGES = 'SET_MESSAGES';
const EDITING_MESSAGES = 'EDITING_MESSAGES';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const SELECT_MESSAGE = 'SELECT_MESSAGE';
const READED_MESSAGES = 'READED_MESSAGES';
const READED_LAST_MESSAGE = 'READED_LAST_MESSAGE';
const MESSAGE_HISTORY_EMPTY = 'MESSAGE_HISTORY_EMPTY';

const EDIT_MESSAGE = 'EDIT_MESSAGE';
const SAVE_EDITED_MESSAGE = 'SAVE_EDITED_MESSAGE';
const CLOSE_REPLY_MESSAGE = 'CLOSE_REPLY_MESSAGE';

const TYPING_MESSAGE = 'TYPING_MESSAGE';

const SET_ONLINE = 'SET_ONLINE';
const SET_LAST_SEEN = 'SET_LAST_SEEN';

const TOGGLE_DELETE_PANEL = 'TOGGLE_DELETE_PANEL';

const NOTIF_BADGE = 'NOTIF_BADGE';
const DELETE_NOTIF_BADGE = 'DELETE_NOTIF_BADGE';

const SET_USER_AND_DIALOGS = 'SET_USER_AND_DIALOGS';

const FILE_REQUESTED = 'FILE_REQUESTED';
const FILE_SUCCESSFULLY_UPLOADED = 'FILE_SUCCESSFULLY_UPLOADED';

export {
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOG_OUT,
  GET_USER,
  SET_USER,
  DELETE_USER,
  GET_AUTHORIZED_USER,
  SET_AUTHORIZED_USER,
  REGISTER_REQUESTED,
  CLEAR_ERROR_USER,
  DEALOGS_REQUESTED,
  DIALOGS_LOAD_SUCCESS,
  SET_DIALOG,
  SET_DIALOG_ID,
  DELETE_DIALOG_ID,
  MESSAGES_REQUESTED,
  MESSAGES_LOAD_SUCCESS,
  SET_LAST_MESSAGE,
  SET_MESSAGE,
  SET_MESSAGES,
  EDITING_MESSAGES,
  CREATED_MESSAGE,
  DELETE_MESSAGE,
  SELECT_MESSAGE,
  TYPING_MESSAGE,
  EDIT_MESSAGE,
  READED_MESSAGES,
  READED_LAST_MESSAGE,
  CLOSE_REPLY_MESSAGE,
  SAVE_EDITED_MESSAGE,
  MESSAGE_HISTORY_EMPTY,
  CONTACTS_REQUESTED,
  SET_FOUND_CONTACTS,
  SET_CONTACT_ID,
  DELETE_SELECTED_CONTACT,
  SET_ONLINE,
  SET_LAST_SEEN,
  TOGGLE_DELETE_PANEL,
  NOTIF_BADGE,
  DELETE_NOTIF_BADGE,
  SET_USER_AND_DIALOGS,
  FILE_REQUESTED,
  FILE_SUCCESSFULLY_UPLOADED
}