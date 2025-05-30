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
const orderRoutes = require('./routes/orderRoutes');


const { createServer } = require("http");
const server = createServer(app); 

const createSocketIo = require("./socket/socket"); // added or edit this line


const allowedOrigins = [
  process.env.CLIENT_URL,  
  process.env.CLIENT_URLL  
];


app.use(
cors({
  origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {  
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"]
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
  .catch((err) => console.log('MongoDB connection error:', err));
  
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
  
