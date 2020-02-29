import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';

import { stopFindContacts } from 'actions/action_contacs'
import { getFoundByUsers } from 'actions/action_contacs';
import 'style_components/search/style.scss';

const { Search } = Input;

const DialogSearch = () => {
  const [value, setValue] = useState('');
  const { loading, contacts } = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const getUsers = useCallback(data => dispatch(getFoundByUsers(data)), [dispatch]);
  const stopFind = useCallback(() => dispatch(stopFindContacts()), [dispatch]);

  useEffect(() => {
    if (value) {
      getUsers(value);
    }
  }, [value, getUsers]);

  useEffect(() => {
    if (!value && contacts.length) {
      stopFind();
    }
  });

  return (
    <div className='dialogs_search'>
      <Search
        placeholder="Search for users"
        onChange={ evt => setValue(evt.target.value) }
        allowClear
        loading={ loading }
      />
    </div>
  )
};

export default DialogSearch;