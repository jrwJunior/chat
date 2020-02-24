import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Icon } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { ContextMenu, MenuItem } from "react-contextmenu";

import Editor from 'components/editor';
import Message from 'components/message';
import { getAllMessages, deleteMessage } from 'actions/action_messages';
import { getUsersDialog, confirmDelete } from 'utils/helpers';
import './style.scss';
import 'style_components/indicator/style.scss';

const HistoryMessages = props => {
  const { match } = props;
  const { messages, isLoading } = useSelector(state => state.chat_message);
  const { dialogs } = useSelector(state => state.chat_dialogs);

  const dispatch = useDispatch();
  const getHistory = useCallback((dialogId, interlocutor) => dispatch(getAllMessages({ dialogId, interlocutor })), [dispatch]);
  const removeMessage = useCallback(id => dispatch(deleteMessage(id)), [dispatch]);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const handleDelete = (evt, data, child) => {
    const messageId = child.lastChild.dataset.messageId;

    confirmDelete(removeMessage, messageId);
  }

  useEffect(() => {
    if (dialogs.length && !messages.length) {
      const dialog = getUsersDialog( dialogs, match.params.id) || {};

      getHistory(dialog._id, match.params.id);
    }
  }, [getHistory, dialogs, messages, match.params.id]);

  return (
    <>
      <Scrollbars
        style={{ height: 'calc(100% - 110px)' }}
      >
        <div className='history-messages'>
          { isLoading ? (
            <Spin indicator={ antIcon }/>
            ) : messages.map(item => (
              <Message
                key={ item._id }
                interlocutorId={ match.params.id }
                { ...item }
              />
            ))}
          <ContextMenu id="some_unique_identifier">
            <MenuItem
              onClick={ handleDelete }
            >
            Delete Message
            </MenuItem>
            <MenuItem>
              Select Message
            </MenuItem>
          </ContextMenu>
        </div>
      </Scrollbars>
      <Editor
        userId={ match.params.id }
      />
    </>
  )
};

export default HistoryMessages;