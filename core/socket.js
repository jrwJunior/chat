const socket = require('socket.io');

const userConnected = (io, users) => {
  io.emit('AUTH_USER', {
    users
  });
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
    })

    socket.on('disconnect', () => {
      const indexUser = authorizedUsers.findIndex(user => user === socket.user);
      authorizedUsers.splice(indexUser, 1);
      
      userConnected(io, authorizedUsers);
    });
  });

  return io;
};