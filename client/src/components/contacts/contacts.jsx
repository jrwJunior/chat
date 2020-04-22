import React from 'react';
import { useSelector } from 'react-redux';

import ContactsItem from 'components/contacts_item';

const Contacts = () => {
  const { contacts } = useSelector(state => state.contacts);

  return (
    <div className='dialogs-contacs'>
      <ul className='nav-pills'>
        { contacts.map(item => (
          <ContactsItem
            key={ item._id }
            { ...item }
          />
        ))}
      </ul>
    </div>
  )
};

export default Contacts;