const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookiesParser = require("cookie-parser");
const app = express();

const {default: mongoose} = require("mongoose");
const userRoutes = require('./routes/userRoutes')
const menuRoutes = require('./routes/menuRoutes');
const contactRoutes = require('./routes/contactRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const wishlistRoutes = require('./routes/wishListRoutes');
const cartRoutes = require('./routes/cartRoutes');


const { createServer } = require("http");
const server = createServer(app);

const createSocketIo = require("./socket/socket"); // added or edit this line


app.use( 
  cors({
    origin: process.env.FRONTEND_URL, // Make sure this points to http://localhost:3000 during development
    credentials: true, // Allow credentials like cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true, // Allow credentials
  })
); 

app.use(express.json()); 
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

const io = createSocketIo(server); // added or edit this line


app.get("/", (req, res) => {
  return res.json({
    message: "Server sis running on port " + PORT,
  });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
  
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);


 