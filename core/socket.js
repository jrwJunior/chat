import socket from "socket.io";

export default http => {
  const io = socket(http);

  io.on("connection", socket => {
    socket.on('DIALOG_JOIN', roomId => {
      socket.join(roomId, () => {
        let rooms = Object.keys(socket.rooms);
        console.log(socket.rooms, 'rooms')
      });
    });

    socket.on('MESSAGE_RECEIVED', data => (
      io.to(data.roomId).emit('MESSAGE_RECEIVED', data)
    ));

    socket.on('TYPING_MESSAGE', obj => {
      socket.broadcast.emit('TYPING_MESSAGE', obj);
    });

    socket.on('STATUS_ONLINE', uid => {
      io.of('/').in(uid).clients((error,clients) => {
        if (clients.hasOwnProperty(uid), uid) {
          console.log('foo')
        }
      });
    })
  });
};