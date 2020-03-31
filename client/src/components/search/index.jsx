import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';

import { getFoundUsers } from 'actions/action_contacs';
import 'style_components/search/style.scss';

const { Search } = Input;

const DialogSearch = () => {
  const { loading } = useSelector(state => state.contacts);
  const { dialogs } = useSelector(state => state.chatDialogs);
  const dispatch = useDispatch();

  const foundUser = useCallback(data => dispatch(getFoundUsers(data)), [dispatch]);

  const handleChange = evt => {
    const value = evt.target.value.toLowerCase();
    // eslint-disable-next-line
    const foundContacts = dialogs.filter(({author, partner}) => {
      const fullNameOne = `${author.firstName} ${author.sruname}`.toLowerCase();
      const fullNameSecond = `${partner.firstName} ${partner.sruname}`.toLowerCase();
      
      if (value) {
        return (
          fullNameOne.indexOf(value) >= 0 || 
          fullNameSecond.indexOf(value) >= 0
        )
      }
    });

    if (!foundContacts.length) {
      foundUser(evt.target.value);
    }
  }

  return (
    <div className='dialogs_search'>
      <Search
        placeholder="Search..."
        onChange={ handleChange }
        allowClear
        loading={ loading }
      />
    </div>
  )
};

export default DialogSearch;