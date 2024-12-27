// socket.js

const { Server } = require("socket.io");
const { isAuth } = require("../middlewares/auth/isAuth");

function createSocketIo(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected:", socket.id);

    const token = socket.handshake.auth.token;
    console.log(token)

    socket.on("notification", (data) => {

      console.log("Data from client:", data);
      io.emit("receiveNotification", { msg: `from server: ${data.msg}` }); 
});

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = createSocketIo;
