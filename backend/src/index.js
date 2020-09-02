const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const mongoose = require("mongoose");

const Room = require("./Room");

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const DB_CONNECTION_STRING = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
mongoose.connect(
  DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      throw err;
    }
  }
);

io.on("connect", (socket) => {
  socket.on("createRoom", async () => {
    const room = new Room({
      videoQueue: [],
    });

    await room.save().then((room) => {
      socket.emit("roomId", room._id);
    });
  });

  //**REFACTOR JOINROOM */
  // socket.on("joinRoom", (roomId) => {
  //   const room = rooms.find((room) => {
  //     return room.roomId === roomId;
  //   });
  //   if (room) {
  //     socket.join(roomId);
  //     socket.emit("roomInfo", room);
  //   } else {
  //     socket.emit("err", "room does not exist");
  //   }
  // });

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
