import React from 'react';
import { Badge } from 'antd';

const DialogsItem = () => {
  return (
    <ul className='nav-pills'>
      <li className='dialog-wrap'>
        {/* eslint-disable-next-line */}
        <a href="#" className='dialog'>
          <div className='dialog-photo'>
            <div className='dialog-photo_inner'>
              <img src="https://instagram.fdnk1-2.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/79030657_175377713578426_6336390883977256068_n.jpg?_nc_ht=instagram.fdnk1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=xv-nZi9t86YAX-7pAWh&oh=e5fc282c998d22500053725c58d5746e&oe=5ED7F205" alt=""/>
            </div>
            <span className='online-status'/>
          </div>
          <div className='dialog-message_wrap'>
            <div className="dialog-head">Jack the Ripper</div>
            <div className="dialog-message">
              Я ща стрепсилс тебе куплю, п…
            </div>
          </div>
          <div className="dialog-meta">
            <div className="dialog-date">13:01</div>
            <Badge count={ 3 }/>
          </div>
        </a>
      </li>
    </ul>
  )
};

export default DialogsItem;