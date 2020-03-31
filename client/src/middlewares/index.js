import * as actionTypes from 'constans';

import { setLoginData } from 'actions/action_auth';

export default () => next => action => {
  switch(action.type) {
    case actionTypes.LOGIN_SUCCESS:
      const { headers, data } = action.payload;
      const isLoggedIn = localStorage['token'];
      
      if (!isLoggedIn) {
        localStorage.setItem('token', headers.authorization);
        localStorage.setItem('authentication', true);

        return next(setLoginData({
          data
        }));
      }

      return next(action);
    case actionTypes.LOG_OUT:
      const keys = ['token', 'authentication'];

      for (let i = 0; i < keys.length; i+=1) {
        localStorage.removeItem(keys[i]);
      }

      return next(action);
    default:
      return next(action);
  }
}