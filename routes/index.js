const lastSeen = require('../middlewares/lastSeen');
const { 
  UserController,
  DialogController,
  MessageController
} = require('../controllers');

module.exports = (app, socket) => {
  const { findUser, createUser, login, getUser, getAuthUser } = new UserController(socket);
  const { getDialogs } = new DialogController(socket);
  const { getMessages, createMessage, deleteMessage, editMessage, messageRead } = new MessageController(socket);

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