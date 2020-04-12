import Root from './index';
import axios from 'axios';

class APIUser extends Root {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  getAuthUser = async() => {
    try {
      const { data } = await axios.get('/api/user/me');
      return data;
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }

  getMyPartner = async(id) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('auth_key');
  
    try {
      return await axios.get(`/api/user/p/${id}`);
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }

  searchUsers = async(query) => {
    try {
     return await axios.get(`/api/user/search?query=${query}`);
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }
}

export {
  APIUser
}