import axios from 'axios';

class API {
 async getAllDialogs() {
   try {
    const { data } = await axios.get('/dialogs');
    return data;
   } catch(e) {
    console.log(e.message);
   }
 }

 async getAllMessages(dialogId) {
  try {
    const { data } = await axios.get(`/messages?dialog=${dialogId}`);
    return data;
   } catch(e) {
    console.log(e.message);
   }
 }
}

export {
  API
};