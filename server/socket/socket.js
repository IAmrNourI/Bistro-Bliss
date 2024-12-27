// socket.js

const { Server } = require("socket.io");
const cookie = require("cookie"); // added
const jwt = require("jsonwebtoken"); // added
const { isAuth } = require("../middlewares/auth/isAuth"); // existing import

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

    // Parse cookies from the handshake headers // added
    const cookies = socket.handshake.headers.cookie; // added
    if (cookies) { // added
      const parsedCookies = cookie.parse(cookies); // added
      const token = parsedCookies.token; // assuming token is stored under 'token' key // added

      if (token) { // added
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // verify token // added
          socket.userId = decoded.id; // attach user ID to socket // added
          console.log(`Authenticated user ID: ${socket.userId}`); // added

          // Join the user to a room named after their user ID // added
          socket.join(socket.userId); // added

        } catch (err) {
          console.log("Invalid token"); // added
          socket.disconnect(); // disconnect socket if token is invalid // added
          return; // stop further execution // added
        }
      } else {
        console.log("No token found in cookies"); // added
        socket.disconnect(); // disconnect socket if no token // added
        return; // stop further execution // added
      }
    } else {
      console.log("No cookies found"); // added
      socket.disconnect(); // disconnect socket if no cookies // added
      return; // stop further execution // added
    }

    // Emit a welcome message to the connected user // kept existing
    socket.emit("hamada", { msg: "Hamada is great!" });

    // Listen for 'someEvent' from the client // kept existing
    socket.on("someEvent", (data) => {
      console.log("Data from client:", data);
      socket.emit("serverResponse", { msg: "Hello from server!" });
    });

    // Listen for 'notification' event and emit to specific user // edited
    socket.on("notification", (data) => {
      console.log("Data from client:", data);
      const targetUserId = data.targetUserId; // added (assuming you send targetUserId) // added
      const message = data.msg; // keep the message

      if (targetUserId) { // added
        // Emit the notification to the specific user's room // added
        io.to(targetUserId).emit("receiveNotification", { msg: `from server: ${message}` }); // added
      } else {
        console.log("No targetUserId provided"); // added
        // Optionally, handle cases where targetUserId is not provided // added
      }
    });

    // Listen for 'disconnect' event // kept existing
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = createSocketIo;
