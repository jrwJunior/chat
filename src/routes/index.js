import multer from '../core/multer';
import lastSeen from '../middlewares/lastSeen';
import { 
  UserController,
  DialogController,
  MessageController,
  UploadController
} from '../controllers';

export default (app, socket) => {
  const { findUser, createUser, login, getUser, getAuthUser } = new UserController(socket);
  const { getDialogs } = new DialogController(socket);
  const { getMessages, createMessage, deleteMessage, editMessage, messageRead } = new MessageController(socket);
  const { uploadFile } = new UploadController();

  // Route user
  app.get('/api/user/me', lastSeen, getAuthUser);
  app.get('/api/user/search', findUser);
  app.get('/api/user/p/:id', getUser);
  app.post('/api/login', login);
  app.post('/api/register', createUser);

  // Route dialogs 
  app.get('/api/dialogs', getDialogs);

  // Route Messages
  app.get('/api/messages', getMessages);
  app.post('/api/messages', createMessage);
  app.put('/api/readed', messageRead);
  app.put('/api/edited', editMessage);
  app.delete('/api/messages', deleteMessage);

  app.post("/api/file", multer.single('file'), uploadFile);
}