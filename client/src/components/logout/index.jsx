import React from 'react';
import { withRouter } from 'react-router-dom';
import { Popover } from 'antd';

// import { logOut } from 'actions/action_auth';
import './style.scss';

const LogOut = () => {
  // const dispatch = useDispatch();
  // const logout = useCallback(() => dispatch(logOut()), [dispatch]);

  const content = (
    <button
      className='logout-btn'
      // onClick={logout}
    >
      Log out
    </button>
  )

  return (
    <Popover placement="bottomRight" content={content} trigger="click">
      <button 
        className='btn-dropdown'
      >
        <span className='dropdown-icon'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.667 426.667">
            <circle cx="42.667" cy="213.333" r="42.667"/>
            <circle cx="213.333" cy="213.333" r="42.667"/>
            <circle cx="384" cy="213.333" r="42.667"/>
          </svg>
        </span>
      </button>
    </Popover>
  )
};

export default withRouter(LogOut);