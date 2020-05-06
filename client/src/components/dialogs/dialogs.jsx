import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Spin, Icon } from 'antd';

import Search from '../search';
import DialogItem from '../dilaog_item';
import Dropdown from 'components/dropdown';
import Contacts from 'components/contacts';
import UploadFile from 'components/uploadFile';

import { usePrevious } from 'utils/hooks';
import { getAllMessages } from 'actions/action_messages';
import { getUser } from 'actions/action_user';

import './style.scss';

const list = (({authorizedUser, dialogs }) => (
  <ul className='nav-pills'>
    { dialogs.map(({author, partner, ...rest}) => (
      <DialogItem 
        key={ rest._id }
        authorizedUser={ authorizedUser }
        user={ authorizedUser._id === author._id ? partner : author }
        { ...rest }
      />
    ))}
  </ul>
));

const Dialogs = props => {
  const { dialogs, noDialogs, loading } = useSelector(state => state.chatDialogs);
  const { contacts } = useSelector(state => state.contacts);
  const { authorizedUser } = useSelector(state => state.authUser);
  const { dialogId } = useSelector(state => state.dialog);

  const paramsId = props.location.pathname.split('/im/p/').join('');
  const prevState = usePrevious(dialogId)

  const dispatch = useDispatch();
  // eslint-disable-next-line
  const assholes = useCallback(() => list({authorizedUser, dialogs}), [dialogs]);
  const setMessages = useCallback(() => dispatch(getAllMessages()), [dispatch]);
  const getUserData = useCallback(id => dispatch(getUser(id)), [dispatch]);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    // eslint-disable-next-line
    if (prevState != dialogId) {
      setMessages();
    }
    // eslint-disable-next-line
    if ((prevState && prevState != dialogId)) {
      getUserData(paramsId);
    }

    // eslint-disable-next-line
  }, [prevState, dialogId, setMessages, getUserData]);

  return (
    <aside className='dialogs-panel'>
      <div className='dialogs-head'>
        <UploadFile
          user={ authorizedUser }
        />
        <h1 className='dialogs-title'>Chats</h1>
        <div className='separator'/>
        <Dropdown/>
      </div>
      <Search/>
      <Scrollbars
        autoHide
        autoHideTimeout={ 1000 }
        autoHideDuration={ 200 }
      >
        { loading ? <Spin indicator={ antIcon }/> : null }
        { !contacts.length ? assholes() : <Contacts/> }
        { noDialogs && !contacts.length ? <div className='dialogs-empty'>No contacts yet...</div> : null }
      </Scrollbars>
    </aside>
  )
};

export default withRouter(Dialogs);