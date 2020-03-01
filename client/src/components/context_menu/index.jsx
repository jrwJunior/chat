import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContextMenu, MenuItem } from "react-contextmenu";

import { openDeletePanel } from 'actions/action_deletePanel';
import { deleteMessage, flaggedMessage } from 'actions/action_messages';
import { confirmDelete } from 'utils/helpers';

export default () => {
  const { isOpenPanel } = useSelector(state => state.deletePanel);
  const contextItemClass = {className: isOpenPanel ? 'react-contextmenu-item-disabled' : null};

  const dispatch = useDispatch();
  const removeMessage = useCallback(id => dispatch(deleteMessage(id)), [dispatch]);
  const setPanel = useCallback(close => dispatch(openDeletePanel(close)), [dispatch]);
  const setFlaggedMessage = useCallback(id => dispatch(flaggedMessage(id)), [dispatch]);

  const handleDelete = (evt, data, child) => {
    const id = child.lastChild.dataset.msgId;

    confirmDelete(removeMessage, id);
  }

  const handleSelect = (evt, data, child) => {
    const id = child.lastChild.dataset.msgId;

    setFlaggedMessage(id);
    setPanel(true);
  }

  return (
    <ContextMenu id="some_unique_identifier">
      <MenuItem attributes={contextItemClass}>
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