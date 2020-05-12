import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';

import { getFoundUsers, deleteSelectedContact } from 'actions/action_contacs';
import { usePrevious } from 'utils/hooks';

import 'style_components/search/style.scss';

const { Search } = Input;

const DialogSearch = () => {
  const [value, setValue] = useState('');
  const { loading } = useSelector(state => state.contacts);
  const { dialogs, user } = useSelector(state => ({
    dialogs: state.chatDialogs.dialogs,
    user: state.user.user
  }));

  const dispatch = useDispatch();
  const foundUser = useCallback(data => dispatch(getFoundUsers(data)), [dispatch]);
  const deleteContact = useCallback(() => dispatch(deleteSelectedContact()), [dispatch]);

  const prevState = usePrevious(user);

  const filterContact = value => {
    // eslint-disable-next-line
    const foundContacts = dialogs.filter(({author, partner}) => {
      const owner = `${author.firstName} ${author.surname}`.toLowerCase();
      const user = `${partner.firstName} ${partner.surname}`.toLowerCase();

      if (value) {
        return (
          owner.indexOf(value.toLowerCase()) >= 0 || 
          user.indexOf(value.toLowerCase()) >= 0
        )
      }
    });

    if (!foundContacts.length) {
      foundUser(value);
    }
  };

  const handleChange = evt => {
    const value = evt.target.value;
    setValue(value);
    filterContact(value);
  }

  useEffect(() => {
    // eslint-disable-next-line
    if (prevState != user) {
      setValue('');
      deleteContact();
    }
  }, [user, prevState, deleteContact]);

  return (
    <div className='dialogs_search'>
      <Search
        placeholder="Search..."
        onChange={ handleChange }
        allowClear
        value={value}
        loading={ loading }
      />
    </div>
  )
};

export default DialogSearch;