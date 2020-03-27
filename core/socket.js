import socket from "socket.io";

export default http => {
  const io = socket(http);

  io.on("connection", socket => {
    socket.on('DIALOG_JOIN', roomId => {
      socket.join(roomId);
    });

    socket.on('TYPING_MESSAGE', obj => {
      socket.broadcast.emit('TYPING_MESSAGE', obj);
    });

    socket.on('STATUS_ONLINE', roomId => {
      io.of('/').in(roomId).clients((error, clients) => {
        if (error) {
          console.log(error);
        }

        socket.broadcast.emit('STATUS_ONLINE', {
          isOnline: clients.length > 0
        });
      });
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('STATUS_ONLINE', {
        isOnline: false,
        lastSeen: new Date()
      });
    });
  });

  return io;
};