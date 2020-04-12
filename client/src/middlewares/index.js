import * as actionTypes from 'constans';

import { setLoginData } from 'actions/action_auth';

export default () => next => action => {
  switch(action.type) {
    case actionTypes.LOGIN_SUCCESS:
      const { headers, data } = action.payload;
      const isLoggedIn = localStorage['auth_key'];

      if (!isLoggedIn) {
        localStorage.setItem('auth_key', headers.authorization);

        return next(setLoginData({
          data
        }));
      }

      return next(action);
    case actionTypes.LOG_OUT:
      localStorage.removeItem('auth_key');

      return next(action);
    default:
      return next(action);
  }
}