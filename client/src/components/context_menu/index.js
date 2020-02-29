import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContextMenu, MenuItem } from "react-contextmenu";

import { openPanelEdit } from 'actions/action_editPanel';
import { deleteMessage, selectMessage } from 'actions/action_messages';
import { confirmDelete } from 'utils/helpers';

export default () => {
  const { openedPanel } = useSelector(state => state.editPanel);
  const contextItemClass = {className: openedPanel ? 'react-contextmenu-item-disabled' : null};

  const dispatch = useDispatch();
  const removeMessage = useCallback(id => dispatch(deleteMessage(id)), [dispatch]);
  const setPanel = useCallback(close => dispatch(openPanelEdit(close)), [dispatch]);
  const setSelectMessage = useCallback(id => dispatch(selectMessage(id)), [dispatch]);

  const handleDelete = (evt, data, child) => {
    const id = child.lastChild.dataset.msgId;

    confirmDelete(removeMessage, id);
  }

  const handleSelect = (evt, data, child) => {
    const id = child.lastChild.dataset.msgId;

    setSelectMessage(id);
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