import axios from 'axios';
import Root from './index';

class APIUploadFile extends Root {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  uploadAvatar = async(file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const { data } = await axios.post('/api/file', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      return data;
    } catch(error) {
      this.errorBoundary(error.response);
    }
  }
}

export {
  APIUploadFile
}