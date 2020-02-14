import * as actionTypes from 'constans';

import { setLoginData } from 'actions/action_auth'

export default () => next => action => {
  switch(action.type) {
    case actionTypes.LOGIN_SUCCESS:
      const { headers, data } = action.payload;
      const token = localStorage['_token'];
      
      if (!token || token !== headers.authorization) {
        localStorage.setItem('_token', headers.authorization);

        return next(setLoginData({
          data,
          token: headers.authorization
        }));
      }

      return next(action);
    default:
      return next(action);
  }
}