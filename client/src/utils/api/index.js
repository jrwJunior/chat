import axios from 'axios';

export default class Root {
  constructor() {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('auth_key');
  }

  errorBoundary(error) {
    throw new Error(JSON.stringify(error.data));
  }
}