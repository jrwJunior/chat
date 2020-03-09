import axios from 'axios';

class API {
  constructor() {
    axios.defaults.headers.common['authorization'] = localStorage['token'];
  }

  errorBoundary(error) {
    throw new Error(JSON.stringify(error.data));
  }

  login = async(values) => {
    try {
      return await axios.post('/api/login', values);
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }

  createAccount = async(values) => {
    try {
      const res = await axios.post('/api/register', values);
      return res;
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }

  getUser = async() => {
    try {
      const { data } = await axios.get('/api/user/me');
      return data;
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }

  searchForUsers = async(query) => {
    try {
     return await axios.get(`/api/user/search?query=${query}`);
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }

  getAllDialogs = async() => {
    try {
      const { data } = await axios.get('/api/dialogs');
      return data;
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }

  getMessages = async({ dialogId }) => {
    try {
      return await axios.get(`/api/messages?dialog=${dialogId}`);
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }

  createMessage = async({ message, dialogId, interlocutor }) => {
    try {
      axios.post('/api/messages', {
        message,
        dialogId,
        interlocutor
      });
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }

  editedMessage = data => {
    try {
      axios.put('/api/edited', data);
    } catch(error) {
      this.errorBoundary(error.response);
    }
  };

  removeMessage = async(data) => {
    try {
      axios.delete('/api/messages', {
        data
      });
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }
}

export {
  API
};