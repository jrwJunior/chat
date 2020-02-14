import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Icon } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import SendPanel from 'components/send_panel';
import Message from 'components/message';
import { getAllMessages } from 'actions/action_messages';
import { getUsersDialog } from 'utils/helpers';
import './style.scss';
import 'style_components/indicator/style.scss';

const HistoryMessages = props => {
  const { match } = props;
  const { userData } = useSelector(state => state.user_auth);
  const { messages, isLoading } = useSelector(state => state.chat_message);
  const { dialogs } = useSelector(state => state.chat_dialogs);

  const dispatch = useDispatch();
  const getHistory = useCallback((dialogId, interlocutor) => dispatch(getAllMessages({ dialogId, interlocutor })), [dispatch]);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    if (dialogs.length) {
      const dialog = getUsersDialog(dialogs, match.params.id) || {};
      getHistory(dialog._id, match.params.id);
    }
  }, [getHistory, dialogs, match.params.id]);

  return (
    <>
      <Scrollbars
        style={{ height: 'calc(100% - 110px)' }}
      >
        <div className='history-messages'>
          { isLoading ? (
            <Spin indicator={antIcon}/>
            ) : messages.map(item => (
              <Message
                key={ item._id }
                isMe={ item.user._id === userData._id }
                { ...item }
              />
            ))}
        </div>
      </Scrollbars>
      <SendPanel
        userId={ match.params.id }
      />
    </>
  )
};

export default HistoryMessages;