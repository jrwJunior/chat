import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';

import { getFoundUsers, deleteSelectedContact } from 'actions/action_contacs';

import 'style_components/search/style.scss';

const { Search } = Input;

const DialogSearch = () => {
  const [value, setValue] = useState('');
  const { loading, contactId } = useSelector(state => state.contacts);
  const { dialogs } = useSelector(state => state.chatDialogs);

  const dispatch = useDispatch();
  const foundUser = useCallback(data => dispatch(getFoundUsers(data)), [dispatch]);
  const deleteContact = useCallback(() => dispatch(deleteSelectedContact()), [dispatch]);

  const filterContact = value => {
    // eslint-disable-next-line
    const foundContacts = dialogs.filter(({author, partner}) => {
      const owner = `${author.firstName} ${author.sruname}`.toLowerCase();
      const user = `${partner.firstName} ${partner.sruname}`.toLowerCase();
      
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
    if (contactId) {
      setValue('');
      deleteContact();
    }
  }, [contactId, deleteContact]);

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