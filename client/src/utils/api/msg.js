import axios from 'axios';
import Root from './index';

class APIMsg extends Root {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  getMessages = async(id) => {
    try {
      const { data } = await axios.get(`/api/messages?dialog=${id}`);
      return data;
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }

  getMessagesRead = async({dialogId}) => {
    try {
      axios.put(`/api/readed?dialog=${dialogId}`);
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }

  createMessage = async({ message, user, author, replyMessage }) => {
    try {
      axios.post('/api/messages', {
        message,
        user,
        author,
        replyMessage
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
  }

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
  APIMsg
}