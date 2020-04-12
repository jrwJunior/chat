import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Icon, Switch } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import ContextMenu from "components/context_menu";

import Editor from 'components/editor';
import Message from 'components/message';

import { getAllMessages, flaggedMessage } from 'actions/action_messages';
import { getUser } from 'actions/action_user';
import { resizeBodyHeight, resizeEditor, isEmpty } from 'utils/helpers';
import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';

import './style.scss';
import 'style_components/indicator/style.scss';

const HistoryMessages = props => {
  const userId = props.match.params.id;

  const { messages, deletedMessages, isLoading } = useSelector(state => state.chat_message);
  const { isOpenPanel } = useSelector(state => state.deletePanel);
  const { user } = useSelector(state => state.user);
  const { authorizedUser } = useSelector(state => state.authUser);
  const { dialogs } = useSelector(state => state.chatDialogs);
  
  const editorNode = useRef();
  const messagesNode = useRef();

  const dispatch = useDispatch();
  const setMessages = useCallback(() => dispatch(getAllMessages()), [dispatch]);
  const setFlaggedMessage = useCallback(id => dispatch(flaggedMessage(id)), [dispatch]);
  const getUserData = useCallback(id => dispatch(getUser(id)), [dispatch]);
  const handleResizeBodyHeight = useCallback(() => {
    resizeBodyHeight(messagesNode, editorNode)
  }, [messagesNode, editorNode]);
  const handleResizeEditor = useCallback(() => {
    resizeEditor(messagesNode, editorNode)
  }, [messagesNode, editorNode]);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const addFlaggedMessage = (id, authorMessage) => {
    if (isOpenPanel) {
      authorMessage && setFlaggedMessage(id);
    }
  }

  useEffect(() => {
    handleResizeBodyHeight();
    handleResizeEditor();
  }, [handleResizeBodyHeight, handleResizeEditor]);

  useEffect(() => {
    if (userId) {
      socket.emit(socketEvents.DIALOG_JOIN, 'guys');
    }

    if (dialogs.length && !messages.length && userId) {
      setMessages();
    }

    if (isEmpty(user) && userId) {
      getUserData(userId);
    }
    // eslint-disable-next-line
  }, [userId, dialogs, setMessages, getUserData]);

  return (
    <div ref={ messagesNode }>
      <Scrollbars
        style={{ height: '100%' }}
      >
        { !messages.length ? <div className='messages-empty'>No messages here yet...</div> : null }
        <div className='history-messages'>
          { isLoading ? (
            <Spin indicator={ antIcon }/>
            ) : messages.map((item, idx, arr) => {
              return (
                <Message
                  key={ item._id }
                  ownerMessage={ authorizedUser._id === item.user._id }
                  selectedMessage={ addFlaggedMessage }
                  deletedMessages={ deletedMessages }
                  isOpenPanel={ isOpenPanel }
                  // createdDate={ createdDate }
                  { ...item }
                >
                  { isOpenPanel ? (
                    <Switch
                      className='select-tick'
                      checkedChildren={ <span className='icon-tick'/> }
                    />
                  ) : null}
                </Message>
              )
            })}
          <ContextMenu/>
        </div>
      </Scrollbars>
      <Editor
        ref={ editorNode }
        userId={ userId }
      />
    </div>
  )
};

export default HistoryMessages;