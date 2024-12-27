// socket.js

const { Server } = require("socket.io");

function createSocketIo(server) {
  // Attach Socket.IO to the passed-in server
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.emit("hamada", {msg: "Hamada is great!"})

    // Example event listener
    socket.on("someEvent", (data) => {
      console.log("Data from client:", data);
      socket.emit("serverResponse", { msg: "Hello from server!" });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = createSocketIo;
