const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const randomstring = require("randomstring");

// TODO, use a DB, maybe mongodb?
const rooms = [];

io.on("connect", (socket) => {
  socket.on("createRoom", () => {
    const roomId = randomstring.generate();
    const room = {
      roomId: roomId,
      videoQueue: [],
    };

    socket.join(roomId);
    rooms.push(room);
    socket.emit("roomId", room.roomId);
  });

  socket.on("joinRoom", (roomId) => {
    const room = rooms.find((room) => {
      return room.roomId === roomId;
    });
    if (room) {
      socket.join(roomId);
      socket.emit("roomInfo", room);
    } else {
      socket.emit("err", "room does not exist");
    }
  });

  socket.on("play", (roomId) => {
    socket.to(roomId).emit("play");
  });

  socket.on("pause", (roomId) => {
    socket.to(roomId).emit("pause");
  });

  socket.on("disconnect", () => {
    console.log("a client has disconnected");
  });
});

server.listen(3001, console.log("socket io server listening on port 3001"));
