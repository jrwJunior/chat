import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { ContextMenu, MenuItem } from "react-contextmenu";
import uuidv5 from 'uuid/v5';

import { openDeletePanel } from 'actions/action_deletePanel';
import { deleteMessage, flaggedMessage } from 'actions/action_messages';
import { editMessage } from 'actions/action_editMessage';
import { confirmDelete } from 'utils/helpers';

import './style.scss';

export default () => {
  const { isOpenPanel } = useSelector(state => state.deletePanel);
  const { messages } = useSelector(state => state.chat_message);

  const dispatch = useDispatch();

  const removeMessage = useCallback(data => dispatch(deleteMessage(data)), [dispatch]);
  const setIsOpenPanel = useCallback(isOpen => dispatch(openDeletePanel(isOpen)), [dispatch]);
  const setFlaggedMessage = useCallback(id => dispatch(flaggedMessage(id)), [dispatch]);
  const setReplyMessage = useCallback(id => dispatch(editMessage(id)), [dispatch]);
  const abc = useCallback(id => {
    // eslint-disable-next-line
    const { message, user } = messages.find(message => {
      if (message._id.indexOf(id) >= 0) {
        return message;
      }
    });

    return {
      message,
      user
    }
  }, [messages]);

  const bom = [
    {
      text: 'Reply',
      disabled: isOpenPanel,
      handleEvent(evt, data, child) {
        const id = child.lastChild.dataset.msgId;
        const { message, user } = abc(id);

        setReplyMessage({
          message,
          id,
          author: `${user.firstName} ${user.surname}`,
          editing: false
        });
      }
    },
    {
      text: 'Edit',
      disabled: isOpenPanel,
      handleEvent(evt, data, child) {
        const id = child.lastChild.dataset.msgId;
        const { message } = abc(id);

        setReplyMessage({
          id,
          message,
          author: 'Edit Message',
          editing: true
        });
      }
    },
    {
      text: 'Delete Message',
      disabled: isOpenPanel,
      handleEvent(evt, data, child) {
        const msdId = child.lastChild.dataset.msgId;

        confirmDelete({
          onCallback: removeMessage,
          content: 'Are you sure you want to delete 1 message?',
          data: msdId,
          okText: 'Delete'
        });
      }
    },
    {
      text: 'Select Message',
      handleEvent(evt, data, child) {
        const id = child.lastChild.dataset.msgId;

        setFlaggedMessage(id);
        setIsOpenPanel(true);
      }
    }
  ];

  return (
    <>
      <ContextMenu 
        id="some_unique_identifier"
      >
        { bom.map(({ text, handleEvent, disabled }, idx) => (
          <MenuItem 
            onClick={ handleEvent }
            disabled={ disabled }
            key={ uuidv5(idx.toString(), uuidv5.DNS) }
          >
            { text }
          </MenuItem>
        ))}
      </ContextMenu>
      <ContextMenu 
        id="some_unique_identifier2"
        className={classNames({'react-context-menu-disabled': isOpenPanel})}
      >
        <MenuItem 
          onClick={ bom[0].handleEvent }
        >
          Reply
        </MenuItem>
      </ContextMenu>
    </>
  )
}