// socket.js

const { Server } = require("socket.io");
const cookie = require("cookie"); 
const jwt = require("jsonwebtoken");

function createSocketIo(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    const cookies = socket.handshake.headers.cookie; 
    if (cookies) { 
      const parsedCookies = cookie.parse(cookies); 
      const token = parsedCookies.token; 

      if (token) { 
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
          socket.userId = decoded.id; 
          console.log(`Authenticated user ID: ${socket.userId}`); 

          socket.join(socket.userId); 

        } catch (err) {
          console.log("Invalid token"); 
          socket.disconnect(); 
          return; 
        }
      } else {
        console.log("No token found in cookies");
        socket.disconnect(); 
        return;
      }
    } else {
      console.log("No cookies found");
      socket.disconnect();
      return;
    }

    socket.on("notification", (data) => {
      const targetUserId = data.targetUserId; 
      const message = data.msg; 
      console.log("Server")

      if (targetUserId) { 
        console.log(targetUserId);
        io.to(targetUserId).emit("receiveNotification", { msg: message }); 
      } else {
        console.log("No targetUserId provided"); 
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = createSocketIo;
