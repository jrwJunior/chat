import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Icon, Switch } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import ContextMenu from "components/context_menu";

import Editor from 'components/editor';
import Message from 'components/message';

import { getAllMessages, flaggedMessage } from 'actions/action_messages';

import './style.scss';
import 'style_components/indicator/style.scss';

const HistoryMessages = props => {
  const userId = props.match.params.id;

  const { messages, deletedMessages, isLoading } = useSelector(state => state.chat_message);
  const { dialogId } = useSelector(state => state.dialog);
  const { isOpenPanel } = useSelector(state => state.deletePanel);

  const editorNode = useRef();
  const messagesNode = useRef();

  const dispatch = useDispatch();
  const setMessages = useCallback((dialogId, interlocutor) => dispatch(getAllMessages({ dialogId, interlocutor })), [dispatch]);
  const setFlaggedMessage = useCallback(id => dispatch(flaggedMessage(id)), [dispatch]);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const addFlaggedMessage = (id, authorMessage) => {
    if (!isOpenPanel) {
      return false;
    }

    authorMessage && setFlaggedMessage(id);
  }

  const handleResizeBodyHeight = useCallback(() => {
    const resizeObserver = new ResizeObserver(entries => {
      const target = entries[0].contentRect.height;
      const offsetHeight = editorNode.current.offsetHeight;

      if (messagesNode.current) {
        messagesNode.current.style = `height: ${target - offsetHeight - 65}px`;
      }
    });

    resizeObserver.observe(document.body);
  }, []);

  const handleResizeEditor = useCallback(() => {
    const resizeObserver = new ResizeObserver(entries => {
      const target = entries[0].contentRect.height + 10;
      const offsetHeight = window.innerHeight - target - 65;

      if (messagesNode.current) {
        messagesNode.current.style = `height: ${offsetHeight}px`;
      }
    });
    resizeObserver.observe(editorNode.current);
  }, []);

  useEffect(() => {
    handleResizeBodyHeight();
    handleResizeEditor();
  }, [handleResizeBodyHeight, handleResizeEditor]);

  useEffect(() => {
    if (dialogId) {
      setMessages(dialogId, userId);
    }
  }, [dialogId, userId, setMessages]);

  return (
    <div ref={ messagesNode }>
      <Scrollbars
        style={{ height: '100%' }}
      >
        <div className='history-messages'>
          { isLoading ? (
            <Spin indicator={ antIcon }/>
            ) : messages.map(item => (
              <Message
                key={ item._id }
                interlocutorId={ userId }
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
        ref={ editorNode }
        userId={ userId }
      />
    </div>
  )
};

export default HistoryMessages;