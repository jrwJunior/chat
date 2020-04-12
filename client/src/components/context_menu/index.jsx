import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContextMenu, MenuItem } from "react-contextmenu";

import { openDeletePanel } from 'actions/action_deletePanel';
import { deleteMessage, flaggedMessage } from 'actions/action_messages';
import { editMessage } from 'actions/action_editMessage';
import { confirmDelete } from 'utils/helpers';

export default () => {
  const { isOpenPanel } = useSelector(state => state.deletePanel);
  const { messages } = useSelector(state => state.chat_message);
  const contextItemClass = {className: isOpenPanel ? 'react-contextmenu-item-disabled' : null};

  const dispatch = useDispatch();
  const removeMessage = useCallback(data => dispatch(deleteMessage(data)), [dispatch]);
  const setIsOpenPanel = useCallback(isOpen => dispatch(openDeletePanel(isOpen)), [dispatch]);
  const setFlaggedMessage = useCallback(id => dispatch(flaggedMessage(id)), [dispatch]);
  const setEditMessage = useCallback(id => dispatch(editMessage(id)), [dispatch]);

  const handleDelete = (evt, data, child) => {
    const msdId = child.lastChild.dataset.msgId;

    confirmDelete({
      onCallback: removeMessage,
      content: 'Are you sure you want to delete 1 message?',
      data: msdId,
      okText: 'Delete'
    });
  }

  const handleSelect = (evt, data, child) => {
    const id = child.lastChild.dataset.msgId;

    setFlaggedMessage(id);
    setIsOpenPanel(true);
  }

  const handleEdit = (evt, data, child) => {
    const id = child.lastChild.dataset.msgId;
    // eslint-disable-next-line
    const { message } = messages.find(message => {
      if (message._id.indexOf(id) >= 0) {
        return message;
      }
    });

    setEditMessage({id, message, author: 'Edit Message', editing: true});
  }

  return (
    <ContextMenu id="some_unique_identifier">
      <MenuItem 
        attributes={contextItemClass}
        onClick={ handleEdit }
      >
        Edit
      </MenuItem>
      <MenuItem
        onClick={ handleDelete }
        attributes={contextItemClass}
      >
        Delete Message
      </MenuItem>
      <MenuItem
        onClick={ handleSelect }
      >
        Select Message
      </MenuItem>
    </ContextMenu>
  )
}