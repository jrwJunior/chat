import * as actionTypes from 'constans';

import { setLoginData } from 'actions/action_auth';

export default () => next => action => {
  switch(action.type) {
    case actionTypes.LOGIN_SUCCESS:
      const { headers, data } = action.payload;
      const isLoggedIn = localStorage['token'];
      
      if (!isLoggedIn) {
        localStorage.setItem('token', headers.authorization);
        // localStorage.setItem('authentication', true);

        return next(setLoginData({
          data
        }));
      }

      return next(action);
    case actionTypes.LOG_OUT:
      localStorage.removeItem('token');
      // localStorage.setItem('authentication', false);

      return next(action);
    default:
      return next(action);
  }
}