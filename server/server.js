const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookiesParser = require("cookie-parser");
const app = express();

const {default: mongoose} = require("mongoose");
const userRoutes = require('./routes/userRoutes')
const menuRoutes = require('./routes/menuRoutes');



app.use(
  cors({
    // origin: process.env.FRONTEND_URL, // Make sure this points to http://localhost:3000 during development
    credentials: true, // Allow credentials like cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  })
);

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  return res.json({
    message: "Server sis running on port " + PORT,
  });
}); 

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));


  app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
  });   


  app.use("/api/user",userRoutes);   
  app.use("/api/menu", menuRoutes);

  //IsKtJzcQQF30kSdN
  //amrelshayal4445  
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjM1MjcxNDJiZjEyODhiZTVkNWY0NSIsImVtYWlsIjoiaWlhbXIubm91cmlpQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM0NTYyNDk3LCJleHAiOjE3MzQ3MzUyOTd9.sSHg49It3VR0ShfcuRTS7uHzyUMGttbuYTM3p39InPw