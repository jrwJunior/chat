import React from 'react';
import { Input } from 'antd';

import 'style_components/search/style.scss';
const { Search } = Input;

const DialogSearch = () => {
  return (
    <div className='dialogs_search'>
      <Search
        placeholder="Search Contacts"
        onSearch={value => console.log(value)}
      />
    </div>
  )
};

export default DialogSearch;