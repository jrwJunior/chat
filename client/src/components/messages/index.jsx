import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Icon, Switch } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import ContextMenu from "components/context_menu";

import Editor from 'components/editor';
import Message from 'components/message';
import { getUsersDialog } from 'utils/helpers';
import { getAllMessages, flaggedMessage } from 'actions/action_messages';

import './style.scss';
import 'style_components/indicator/style.scss';

const HistoryMessages = props => {
  const { match } = props;
  const { messages, deletedMessages, isLoading } = useSelector(state => state.chat_message);
  const { dialogs } = useSelector(state => state.chatDialogs);
  const { isOpenPanel } = useSelector(state => state.deletePanel);

  const dispatch = useDispatch();
  const getHistory = useCallback((dialogId, interlocutor) => dispatch(getAllMessages({ dialogId, interlocutor })), [dispatch]);
  const setFlaggedMessage = useCallback(id => dispatch(flaggedMessage(id)), [dispatch]);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const addFlaggedMessage = (id, authorMessage) => {
    if (!isOpenPanel) {
      return false;
    }

    authorMessage && setFlaggedMessage(id);
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
                flaggMessage={ addFlaggedMessage }
                deletedMessages={ deletedMessages }
                isOpenPanel={ isOpenPanel }
                { ...item }
              >
                { isOpenPanel ? (
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