import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';

import { getFoundByUsers } from 'actions/action_contacs';
import 'style_components/search/style.scss';

const { Search } = Input;

const DialogSearch = () => {
  const { loading } = useSelector(state => state.contacts);
  // const { dialogs } = useSelector(state => state.chatDialogs);
  const dispatch = useDispatch();

  const getUsers = useCallback(data => dispatch(getFoundByUsers(data)), [dispatch]);

  const handleChange = evt => {
    getUsers(evt.target.value);
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