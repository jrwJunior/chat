import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const DialogsBanner = () => {
  return (
    <div className='dialog-banner'>
      <Title level={ 3 }>Chats</Title>
      <span className='dialog-add_message'>
        <svg height="30px" width="30px" viewBox="0 0 36 36">
          <g id="compose" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <polygon id="Fill-1" points="0 36 36 36 36 0 0 0"/>
            <path id="Fill-2" d="M15.047,20.26245 L15.9815,17.45445 C16.091,17.12495 16.276,16.82495 16.5215,16.57945 L27.486,5.60195 C28.29,4.79695 29.595,4.79695 30.399,5.60195 C31.2025,6.40645 31.202,7.70895 30.399,8.51345 L19.432,19.49345 C19.186,19.73945 18.886,19.92495 18.556,20.03495 L15.7555,20.96995 C15.318,21.11645 14.901,20.69995 15.047,20.26245 Z M24.005,28.00095 L12.001,28.00095 C9.791,28.00095 8,26.20945 8,23.99995 L8,11.99895 C8,9.78945 9.791,7.99845 12.001,7.99845 L19.0035,7.99745 C19.5555,7.99745 20.0035,8.44545 20.0035,8.99745 C20.0035,9.54995 19.5555,9.99795 19.0035,9.99795 L12.001,9.99845 C10.8965,9.99845 10.0005,10.89395 10.0005,11.99895 L10.0005,23.99995 C10.0005,25.10445 10.8965,26.00045 12.001,26.00045 L24.005,26.00045 C25.1095,26.00045 26.005,25.10445 26.005,23.99995 C26.005,23.99995 26.0045,17.55145 26.0045,16.99895 C26.0045,16.44645 26.4525,15.99845 27.005,15.99845 C27.557,15.99845 28.005,16.44645 28.005,16.99895 C28.005,17.55145 28.0055,23.99995 28.0055,23.99995 C28.0055,26.20945 26.2145,28.00095 24.005,28.00095 Z" fill="#000000"/>
          </g>
        </svg>
      </span>
    </div>
  )
};

export default DialogsBanner;