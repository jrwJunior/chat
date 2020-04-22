const socket = require('socket.io');

const userConnected = (io, users) => {
  io.emit('AUTH_USER', {
    users
  });
}

const userDisconnected = (userId, users, io) => {
  const indexUser = users.findIndex(user => user === userId);
  users.splice(indexUser, 1);
  
  userConnected(io, users);
}

module.exports = http => {
  const io = socket(http);
  let authorizedUsers = [];

  io.on("connection", socket => {
    socket.on('DIALOG_JOIN', (roomId, userId) => {
      socket.join(roomId);
    });

    socket.on('TYPING_MESSAGE', obj => {
      socket.broadcast.emit('TYPING_MESSAGE', obj);
    });

    socket.on('AUTH_USER', userId => {
      socket.user = userId;

      if (!authorizedUsers.includes(userId)) {
        authorizedUsers.push(userId);
      }

      userConnected(io, authorizedUsers);
    });

    socket.on('USER_LOG_OUT', userId => {
      userDisconnected(userId, authorizedUsers, io);
    });

    socket.on('disconnect', () => {
      userDisconnected(socket.user, authorizedUsers, io);
    });
  });

  return io;
};