import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Icon, Switch } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import ContextMenu from "components/context_menu";

import Editor from 'components/editor';
import Message from 'components/message';
import { getUsersDialog } from 'utils/helpers';
import { getAllMessages, selectMessage } from 'actions/action_messages';

import './style.scss';
import 'style_components/indicator/style.scss';

const HistoryMessages = props => {
  const { match } = props;
  const { messages, selectedMessages, isLoading } = useSelector(state => state.chat_message);
  const { dialogs } = useSelector(state => state.chatDialogs);
  const { openedPanel } = useSelector(state => state.editPanel);

  const dispatch = useDispatch();
  const getHistory = useCallback((dialogId, interlocutor) => dispatch(getAllMessages({ dialogId, interlocutor })), [dispatch]);
  const setSelectMessage = useCallback(id => dispatch(selectMessage(id)), [dispatch]);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const selectDeleteMessage = (id, authorMessage) => {
    if (!openedPanel) {
      return false;
    }

    authorMessage && setSelectMessage(id);
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
                selectMessage={ selectDeleteMessage }
                selectedMessages={ selectedMessages }
                isOpenPanel={ openedPanel }
                { ...item }
              >
                { openedPanel ? (
                  <Switch
                    className='select-tick'
                    checkedChildren={ <span className='icon-tick'/> }
                  />
                ) : null}
              </Message>
            ))}
          <ContextMenu/>
        </div>
      </Scrollbars>
      <Editor
        userId={ match.params.id }
      />
    </>
  )
};

export default HistoryMessages;