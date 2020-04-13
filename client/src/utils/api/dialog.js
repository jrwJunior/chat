import Root from './index';
import axios from 'axios';

export default class APIDialogs extends Root {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  getAllDialogs = async() => {
    try {
      const { data } = await axios.get('/api/dialogs');
      return data;
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }
}

export {
  APIDialogs
}