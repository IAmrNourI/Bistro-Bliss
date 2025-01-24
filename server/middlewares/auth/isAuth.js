const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {

  const authHeader = req.headers["authorization"];
  const token = req.cookies.token || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      error: true,
    });
  }
};  

exports.isVerifyResetPasswordOtp = (req, res, next) => {
  console.log("isVerifyResetPasswordOtp");
  const authHeader = req.headers["authorization"];
  const token = req.cookies.token || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);
  console.log("2")
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_FORGET_KEY);
    console.log("3")
    req.user = decoded;
    console.log("to next")
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      error: true,
    });
  }
};  
