const socket = require('socket.io');

const userConnected = (socket, users) => {
  socket.emit('AUTH_USER', {
    users
  });
}

module.exports = http => {
  const io = socket(http);
  let AuthorizedUsers = [];

  io.on("connection", socket => {
    socket.on('DIALOG_JOIN', (roomId, userId) => {
      socket.join(roomId);
    });

    socket.on('TYPING_MESSAGE', obj => {
      socket.broadcast.emit('TYPING_MESSAGE', obj);
    });

    socket.on('AUTH_USER', userId => {
      socket.user = userId;

      if (!AuthorizedUsers.includes(userId)) {
        AuthorizedUsers.push(userId);
      }

      userConnected(socket, AuthorizedUsers);
    })

    socket.on('disconnect', () => {
      const indexUser = AuthorizedUsers.findIndex(user => user === socket.user);
      AuthorizedUsers.splice(indexUser, 1);
      userConnected(socket, AuthorizedUsers);
    });
  });

  return io;
};