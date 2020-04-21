const express = require('express');

const multer = require('../core/multer');
const { UserController } = require('../controllers/user');
const { DialogController } = require('../controllers/dialog');
const { UploadController } = require('../controllers/upload');
const { MessageController } = require('../controllers/message');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

module.exports = socket => {
  const { findUser, createUser, login, getUser, getAuthUser } = new UserController(socket);
  const { getDialogs } = new DialogController(socket);
  const { getMessages, createMessage, deleteMessage, editMessage, messageRead } = new MessageController(socket);
  const { uploadFile } = new UploadController();

  // Route user
  router.get('/user/me', verifyToken, getAuthUser);
  router.get('/user/search', verifyToken, findUser);
  router.get('/user/p/:id', verifyToken, getUser);
  router.post('/login', login);
  router.post('/register', createUser);

  // Route Dialogs 
  router.get('/dialogs', verifyToken, getDialogs);

  // Route Messages
  router.get('/messages', verifyToken, getMessages);
  router.post('/messages', verifyToken, createMessage);
  router.put('/readed', verifyToken, messageRead);
  router.put('/edited', verifyToken, editMessage);
  router.delete('/messages', verifyToken, deleteMessage);

  // Upload File
  router.post("/file", multer.single('file'), verifyToken, uploadFile);

  return router;
};