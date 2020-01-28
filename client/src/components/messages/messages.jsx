import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Icon } from 'antd';
import { getAllMessages } from 'actions/action_messages';

import { usePrevious } from 'utils/hooks';
import Message from 'components/message';
import './style.scss';
import 'style_components/indicator/style.scss';

const HistoryMessages = () => {
  const { dialogId } = useSelector(state => state.chat_dialogs);
  const { messages, isLoading } = useSelector(state => state.chat_message);
  const prevDialogId = usePrevious(dialogId);
  const dispatch = useDispatch();

  const setMessages = useCallback(() => dispatch(getAllMessages()), [dispatch]);
  const antIcon = <Icon type="loading" style={{ fontSize: 26 }} spin />;

  useEffect(() => {
    // eslint-disable-next-line
    if (prevDialogId != dialogId) {
      setMessages();
    }
  }, [setMessages, prevDialogId, dialogId]);

  return (
    <div className='history-messages'>
      { isLoading ? (
        <Spin indicator={antIcon}/>
      ) : messages.map(item => (
        <Message
          key={ item._id }
          { ...item }
        />
      ))}
    </div>
  )
};

export default HistoryMessages;