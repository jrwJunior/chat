import express from "express";
import multer from 'multer';

import verifyToken from '../middlewares/verifyToken';
import lastSeen from '../middlewares/lastSeen';
import { 
  UserController,
  DialogController,
  MessageController
} from '../controllers';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createRoutes = (app, io) => {
  const { getUser, findUser, createUser, login, foo } = new UserController(io);
  const { getDialogs, createDialog, deleteDialog } = new DialogController(io);
  const { getMessages, createMessage, deleteMessage, editMessage, messageRead } = new MessageController(io);

  app.use(express.json({ extended: true }));

  // Route user
  app.get('/api/user/me', [verifyToken, lastSeen], getUser);
  app.get('/api/user/search', verifyToken, findUser);
  app.post('/api/login', login);
  app.post('/api/register', createUser);
  app.get('/api/user/p/:id', foo);

  // Route dialogs 
  app.get('/api/dialogs', verifyToken, getDialogs);
  // app.post('/api/dialogs', verifyToken, createDialog);
  app.delete('/api/dialogs/:id', verifyToken, deleteDialog);

  // Route Messages
  app.get('/api/messages', verifyToken, getMessages);
  app.post('/api/messages', verifyToken, createMessage);
  app.put('/api/readed', verifyToken, messageRead);
  app.put('/api/edited', verifyToken, editMessage);
  app.delete('/api/messages', verifyToken, deleteMessage);
}


export default createRoutes;