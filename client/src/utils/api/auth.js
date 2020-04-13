import Root from './index';
import axios from 'axios';

class APIAuth extends Root {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  login = async(values) => {
    try {
      return await axios.post('/api/login', values);
    } catch(error) {
      this.errorBoundary(error.response)
    }
  }

  createAccount = async(values) => {
    try {
      await axios.post('/api/register', values);
    } catch(error) {
      this.errorBoundary(error.response)
    }
  }
}

export {
  APIAuth
}