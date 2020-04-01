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
  const { findUser, createUser, login, getUser, getAuthUser } = new UserController(io);
  const { getDialogs } = new DialogController(io);
  const { getMessages, createMessage, deleteMessage, editMessage, messageRead } = new MessageController(io);

  app.use(express.json({ extended: true }));
  app.use(verifyToken);

  // Route user
  app.get('/api/user/me', lastSeen, getAuthUser);
  app.get('/api/user/search', findUser);
  app.post('/api/login', login);
  app.post('/api/register', createUser);
  app.get('/api/user/p/:id', getUser);

  // Route dialogs 
  app.get('/api/dialogs', getDialogs);

  // Route Messages
  app.get('/api/messages', getMessages);
  app.post('/api/messages', createMessage);
  app.put('/api/readed', messageRead);
  app.put('/api/edited', editMessage);
  app.delete('/api/messages', deleteMessage);
}


export default createRoutes;